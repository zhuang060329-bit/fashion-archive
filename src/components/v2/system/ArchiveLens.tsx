'use client'

// ArchiveLens — 全站核心互動器，取代舊的 ScannerCursor。它不是裝飾跟隨點，
// 而是一台「檢視儀器」，狀態機 + magnetic snap + 改變頁面（寫 data-lens 到
// <html>，物件與背景據此反應）。
//
// 狀態（寫到 documentElement 的 data-lens）：
//   idle     —— 細十字檢視框，跟隨 lens 座標（帶儀器延遲）
//   hover    —— 接近可檢視物件，框微擴、亮度提高（吸附前的 soft lock 預備）
//   scan     —— 停在 [data-lens="inspect"] 上：框 morph 到該物件邊界（磁吸），
//                掃描線在框內掃過、讀出物件 lens label
//   pull     —— [data-lens="pull"] 上：框拉長成方向把手，提示可拖動
//   press    —— pointerdown：框瞬間收縮 + accent flash
//
// 位置來源：讀 InteractiveSurface 寫的 --lens-x/--lens-y（共享 pointer store），
// 自己只跑一個輕量 rAF 做「磁吸到目標邊界」的位移與框體 morph。
//
// 降級：reduced-motion 或 coarse pointer → 回傳 null，保留系統游標。

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsCoarsePointer } from '@/hooks/useDesktopViewport'
import { pointer, triggerRipple } from './pointerStore'

type LensState = 'idle' | 'hover' | 'scan' | 'lock' | 'pull' | 'press'

export function ArchiveLens() {
  const prefersReduced = useReducedMotion()
  const isCoarse = useIsCoarsePointer()
  // 兩個 hook 都已 SSR-safe（初始回傳 false），直接 derive 即可，
  // 不需額外 state（避免 setState-in-effect 的串聯 render）
  const enabled = !prefersReduced && !isCoarse

  const frameRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const labelTextRef = useRef<HTMLSpanElement>(null)
  const sweepRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return
    const frame = frameRef.current
    const label = labelRef.current
    const labelText = labelTextRef.current
    if (!frame || !label || !labelText) return
    const root = document.documentElement

    let state: LensState = 'idle'
    let target: HTMLElement | null = null
    let lockTimer: ReturnType<typeof setTimeout> | null = null
    let lockedEl: HTMLElement | null = null

    const clearLock = () => {
      if (lockTimer) { clearTimeout(lockTimer); lockTimer = null }
      if (lockedEl) { lockedEl.classList.remove('is-locked'); lockedEl = null }
    }

    // 框體目標值（quickTo 負責插值，這裡只算目標）
    let tx = pointer.lx
    let ty = pointer.ly
    let tw = 26
    let th = 26

    const setState = (next: LensState) => {
      if (next === state) return
      state = next
      root.setAttribute('data-lens', next)
      frame.dataset.state = next
    }
    root.setAttribute('data-lens', 'idle')
    frame.dataset.state = 'idle'

    const evalTarget = (el: HTMLElement | null) => {
      const host = el?.closest<HTMLElement>('[data-lens]') ?? null
      if (host === target) return
      target = host
      // 換目標就清掉上一個鎖定（計時器 + .is-locked）
      clearLock()

      if (host && host.dataset.lens === 'inspect') {
        labelText.textContent = host.dataset.lensLabel ?? 'INSPECT'
        label.dataset.show = 'true'
        pointer.scanning = true
        // 鎖定瞬間在物件中心觸發背景 ripple（cursor 真正改變背景像素）
        const r = host.getBoundingClientRect()
        triggerRipple(r.left + r.width / 2, r.top + r.height / 2)
        // 掃描線在新目標上掃過一次
        if (sweepRef.current) {
          sweepRef.current.classList.remove('lens-sweep-run')
          // 強制 reflow 以重啟 animation
          void sweepRef.current.offsetWidth
          sweepRef.current.classList.add('lens-sweep-run')
        }
        setState('scan')
        // 停留 420ms 仍在此物件 → 升級為 lock（signature A）：
        // cursor aperture 收緊 + object .is-locked（accent 框 + 檢測括號）+
        // 背景再觸一次 ripple，三者同步。
        const lockHost = host
        lockTimer = setTimeout(() => {
          if (target !== lockHost) return
          lockHost.classList.add('is-locked')
          lockedEl = lockHost
          setState('lock')
          const rr = lockHost.getBoundingClientRect()
          triggerRipple(rr.left + rr.width / 2, rr.top + rr.height / 2)
        }, 420)
      } else if (host && host.dataset.lens === 'pull') {
        labelText.textContent = host.dataset.lensLabel ?? 'DRAG'
        label.dataset.show = 'true'
        pointer.scanning = false
        setState('pull')
      } else if (host) {
        label.dataset.show = 'false'
        pointer.scanning = false
        setState('hover')
      } else {
        label.dataset.show = 'false'
        pointer.scanning = false
        setState('idle')
      }
    }

    const onMove = (e: PointerEvent) => {
      evalTarget(e.target as HTMLElement | null)
    }
    const onDown = () => {
      if (state !== 'scan' && state !== 'pull' && state !== 'lock') setState('press')
      frame.dataset.pressed = 'true'
    }
    const onUp = () => {
      frame.dataset.pressed = 'false'
      // 還原到游標當前所在的狀態
      evalTarget(document.elementFromPoint(pointer.rx, pointer.ry) as HTMLElement | null)
      if (!target) setState('idle')
    }
    const onLeaveDoc = () => {
      frame.dataset.hidden = 'true'
      label.dataset.show = 'false'
    }
    const onEnterDoc = () => {
      frame.dataset.hidden = 'false'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeaveDoc)
    document.documentElement.addEventListener('pointerenter', onEnterDoc)

    // 絲滑的關鍵：用 gsap.quickTo 做插值，而不是手刻 lerp。框體位置/尺寸
    // 用較長 duration（儀器延遲、鎖定時的吸附感），中心精準點 dot 用很短
    // duration 緊跟游標——雙速度差製造「儀器在追、瞄準點已到」的精密手感。
    const dot = dotRef.current
    const qx = gsap.quickTo(frame, 'x', { duration: 0.5, ease: 'power3' })
    const qy = gsap.quickTo(frame, 'y', { duration: 0.5, ease: 'power3' })
    const qw = gsap.quickTo(frame, 'width', { duration: 0.45, ease: 'power3' })
    const qh = gsap.quickTo(frame, 'height', { duration: 0.45, ease: 'power3' })
    const qlx = gsap.quickTo(label, 'x', { duration: 0.5, ease: 'power3' })
    const qly = gsap.quickTo(label, 'y', { duration: 0.5, ease: 'power3' })
    const qdx = dot ? gsap.quickTo(dot, 'x', { duration: 0.16, ease: 'power2' }) : null
    const qdy = dot ? gsap.quickTo(dot, 'y', { duration: 0.16, ease: 'power2' }) : null

    let raf = 0
    const tick = () => {
      if ((state === 'scan' || state === 'lock') && target) {
        // 磁吸：框 morph 到目標邊界，但中心「呼吸」式偏向游標當前位置，
        // 不死鎖在幾何中心——讓吸附跟著你的意圖走，更絲滑
        const r = target.getBoundingClientRect()
        const cxc = r.left + r.width / 2
        const cyc = r.top + r.height / 2
        tx = cxc + (pointer.rx - cxc) * 0.14
        ty = cyc + (pointer.ry - cyc) * 0.14
        tw = r.width + 4
        th = r.height + 4
      } else {
        tx = pointer.lx
        ty = pointer.ly
        tw = state === 'press' ? 16 : state === 'pull' ? 52 : state === 'hover' ? 36 : 26
        th = state === 'press' ? 16 : state === 'pull' ? 22 : state === 'hover' ? 36 : 26
      }

      qx(tx - tw / 2)
      qy(ty - th / 2)
      qw(tw)
      qh(th)
      qlx(tx - tw / 2)
      qly(ty - th / 2 - 20)
      // 精準瞄準點永遠緊跟「原始」游標
      qdx?.(pointer.rx)
      qdy?.(pointer.ry)

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeaveDoc)
      document.documentElement.removeEventListener('pointerenter', onEnterDoc)
      cancelAnimationFrame(raf)
      clearLock()
      gsap.killTweensOf([frame, label, dot].filter(Boolean) as Element[])
      root.removeAttribute('data-lens')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={frameRef} className="archive-lens" aria-hidden="true" data-hidden="false">
        <span className="lens-corner lens-corner-tl" />
        <span className="lens-corner lens-corner-tr" />
        <span className="lens-corner lens-corner-bl" />
        <span className="lens-corner lens-corner-br" />
        <span className="lens-cross lens-cross-x" />
        <span className="lens-cross lens-cross-y" />
        <div ref={sweepRef} className="lens-sweep" />
      </div>
      {/* 精準瞄準點——緊跟原始游標，與滯後的框體形成雙速度精密手感 */}
      <div ref={dotRef} className="archive-lens-dot" aria-hidden="true" />
      <div ref={labelRef} className="archive-lens-label" aria-hidden="true" data-show="false">
        <span ref={labelTextRef} />
      </div>
    </>
  )
}
