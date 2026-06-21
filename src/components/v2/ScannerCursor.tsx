'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsCoarsePointer } from '@/hooks/useDesktopViewport'

// v2 cursor，取代舊版 v1 的 dot follower（CursorFollower，已於 Phase 6K
// 移除）。識別邏輯：archive inspection tool，不是裝飾性跟隨點。
//
// 預設狀態：一個 28×28 的測量框（四個角括號）+ 貫穿視窗寬度的水平掃描細線，
// 跟隨游標但用 GSAP ticker lerp 製造儀器延遲感，不是 1:1 跟隨。
// hover 到 [data-specimen] 元素時：框體 tween 到該元素的實際 bounding box
// （量測工具感——框住被檢視的標本），並讀出 data-specimen-label 顯示在框體上方。
//
// Desktop only / reduced-motion off / touch off / 不影響 focus-visible ring
// （只用 fixed pointer-events:none 圖層，完全不碰 outline）。
export function ScannerCursor() {
  const frameRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const labelTextRef = useRef<HTMLSpanElement>(null)
  const coordRef = useRef<HTMLDivElement>(null)
  const sweepRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isCoarsePointer = useIsCoarsePointer()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (prefersReduced || isCoarsePointer) return

    const frame = frameRef.current
    const line = lineRef.current
    const label = labelRef.current
    const labelText = labelTextRef.current
    const coord = coordRef.current
    const sweep = sweepRef.current
    if (!frame || !line || !label || !labelText || !coord || !sweep) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    // 目前框體狀態（lerp 目標），預設是跟游標走的小測量框
    let targetX = mouseX - 14
    let targetY = mouseY - 14
    let targetW = 28
    let targetH = 28
    let curX = targetX
    let curY = targetY
    let curW = targetW
    let curH = targetH

    let activeSpecimen: HTMLElement | null = null
    let lockTween: gsap.core.Tween | null = null
    let lockReleaseTimer: ReturnType<typeof setTimeout> | null = null

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      const host = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-specimen]') ?? null

      if (host !== activeSpecimen) {
        const previousHost = activeSpecimen
        activeSpecimen = host
        previousHost?.classList.remove('specimen-locked')
        if (lockReleaseTimer) clearTimeout(lockReleaseTimer)

        if (host) {
          const rect = host.getBoundingClientRect()
          labelText.textContent = host.dataset.specimenLabel ?? 'SPECIMEN'

          // 框體 morph：不是瞬間 snap，是一次 0.65s 的 tween 從游標位置擴張到
          // 標本卡邊界（--duration-lock-on）。tween 進行期間 target 與 cur
          // 同步寫入，ticker 的 lerp 步驟自然變成 no-op，不會互相搶值
          lockTween?.kill()
          const proxy = { x: curX, y: curY, w: curW, h: curH }
          lockTween = gsap.to(proxy, {
            x: rect.left,
            y: rect.top,
            w: rect.width,
            h: rect.height,
            duration: 0.65,
            ease: 'power3.out',
            onUpdate: () => {
              curX = targetX = proxy.x
              curY = targetY = proxy.y
              curW = targetW = proxy.w
              curH = targetH = proxy.h
            },
          })

          // Label lock-on：punch-in scale + readout underline 畫出，模擬
          // 儀器鎖定目標後的數值顯示，不是普通 tooltip 淡入
          gsap.fromTo(
            label,
            { scale: 0.85, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(2)', overwrite: 'auto' },
          )
          const underline = label.querySelector<HTMLElement>('.scanner-label-underline')
          if (underline) {
            gsap.fromTo(underline, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
          }

          // Scan pass：一道高光掃過框體寬度，只在「鎖定新標本」那一刻觸發
          gsap.fromTo(
            sweep,
            { left: '-40%', opacity: 1 },
            { left: '100%', opacity: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' },
          )

          // 四角/中點刻度的微弱 bloom pulse
          gsap.fromTo(
            '.scanner-frame-tick, .scanner-frame-corner',
            { opacity: 0.7 },
            { opacity: 1, duration: 0.3, yoyo: true, repeat: 1, ease: 'power1.inOut' },
          )

          // 卡片本體的瞬間鎖定 bloom（見 globals.css .specimen-locked），
          // 700ms 後自動移除——是儀器瞬間高亮，不是持續發光霓虹卡
          host.classList.add('specimen-locked')
          lockReleaseTimer = setTimeout(() => host.classList.remove('specimen-locked'), 700)

          // 鎖定標本時水平掃描線降低亮度——避免它持續以全亮度橫切卡片
          // 文字把字弄髒，框體本身的 bloom 已經足夠表示「鎖定中」
          gsap.to(line, { opacity: 0.35, duration: 0.2, overwrite: 'auto' })
        } else {
          targetW = 28
          targetH = 28
          gsap.to(label, { opacity: 0, duration: 0.15, overwrite: 'auto' })
          gsap.to(line, { opacity: 1, duration: 0.25, overwrite: 'auto' })
        }
      }

      if (!host) {
        targetX = mouseX - targetW / 2
        targetY = mouseY - targetH / 2
      }

      coord.textContent = `X:${String(Math.round(mouseX)).padStart(4, '0')} Y:${String(Math.round(mouseY)).padStart(4, '0')}`
    }

    const onEnterDoc = () => {
      gsap.to([frame, line, coord], { opacity: 1, duration: 0.3 })
    }
    const onLeaveDoc = () => {
      gsap.to([frame, line, label, coord], { opacity: 0, duration: 0.25 })
    }

    document.documentElement.addEventListener('mouseenter', onEnterDoc)
    document.documentElement.addEventListener('mouseleave', onLeaveDoc)
    document.addEventListener('mousemove', onMove)

    const lerp = (from: number, to: number, t: number) => from + (to - from) * t

    const tick = () => {
      // 框體：較慢的儀器延遲（measuring tool 的「對焦」感）
      curX = lerp(curX, targetX, 0.16)
      curY = lerp(curY, targetY, 0.16)
      curW = lerp(curW, targetW, 0.2)
      curH = lerp(curH, targetH, 0.2)

      gsap.set(frame, { x: curX, y: curY, width: curW, height: curH })
      gsap.set(label, { x: curX, y: curY - 22 })

      // 掃描線：跟隨游標 Y，幾乎即時（measuring tool 的水平基準線）
      gsap.set(line, { y: mouseY })
      gsap.set(coord, { x: mouseX + 16, y: mouseY + 10 })
    }
    gsap.ticker.add(tick)

    // 隱藏系統游標改用 data attribute + CSS gate（見 globals.css
    // html[data-scanner-cursor="active"]），不再直接寫 inline cursor:none。
    // 這層 effect 本身已被 prefersReduced / isCoarsePointer 擋下，CSS 那側
    // 又額外 gate 在 (pointer: fine) and (no-preference)，雙重保險：
    // coarse pointer / reduced-motion 一定保留系統游標
    document.documentElement.setAttribute('data-scanner-cursor', 'active')

    return () => {
      document.documentElement.removeEventListener('mouseenter', onEnterDoc)
      document.documentElement.removeEventListener('mouseleave', onLeaveDoc)
      document.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
      document.documentElement.removeAttribute('data-scanner-cursor')
      lockTween?.kill()
      if (lockReleaseTimer) clearTimeout(lockReleaseTimer)
      activeSpecimen?.classList.remove('specimen-locked')
    }
  }, [prefersReduced, isCoarsePointer])

  if (prefersReduced || isCoarsePointer) return null

  return (
    <>
      {/* 測量框 — 四角括號 + 上下緣 caliper tick，量測工具感而非裝飾框 */}
      <div
        ref={frameRef}
        aria-hidden="true"
        className="scanner-frame"
        style={{ position: 'fixed', top: 0, left: 0, opacity: 0, pointerEvents: 'none', zIndex: 900, overflow: 'hidden' }}
      >
        <span className="scanner-frame-corner scanner-frame-corner-tl" />
        <span className="scanner-frame-corner scanner-frame-corner-tr" />
        <span className="scanner-frame-corner scanner-frame-corner-bl" />
        <span className="scanner-frame-corner scanner-frame-corner-br" />
        <span className="scanner-frame-tick" style={{ top: 0, left: '50%', width: '1px', height: '5px' }} />
        <span className="scanner-frame-tick" style={{ bottom: 0, left: '50%', width: '1px', height: '5px' }} />
        <span className="scanner-frame-tick" style={{ left: 0, top: '50%', height: '1px', width: '5px' }} />
        <span className="scanner-frame-tick" style={{ right: 0, top: '50%', height: '1px', width: '5px' }} />
        {/* scan-pass sweep — 鎖定新標本瞬間掃過的高光，不持續播放 */}
        <div ref={sweepRef} className="scanner-sweep" style={{ left: '-40%', opacity: 0 }} />
      </div>

      {/* 水平掃描線，貫穿視窗寬度 */}
      <div
        ref={lineRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '1px',
          background: 'var(--color-archive-400)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 899,
          mixBlendMode: 'difference',
        }}
      />

      {/* Specimen label，框體上方——readout underline 鎖定時從 0 畫到滿 */}
      <div
        ref={labelRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 900,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.18em',
          color: 'var(--color-archive-white)',
          whiteSpace: 'nowrap',
        }}
      >
        <span ref={labelTextRef} />
        <span className="scanner-label-underline" style={{ transform: 'scaleX(0)' }} />
      </div>

      {/* 座標讀數 */}
      <div
        ref={coordRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 899,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.1em',
          color: 'var(--color-archive-500)',
          whiteSpace: 'nowrap',
        }}
      />
    </>
  )
}
