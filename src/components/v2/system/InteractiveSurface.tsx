'use client'

// InteractiveSurface — 全站唯一的 pointer / scroll / era 訊號來源。
//
// 設計原則：只有「一個」rAF loop 在寫 CSS 變數，其他所有反應式效果
// （ArchiveLens 游標、ReactiveArchiveBackground、各 EraScene 的視差層）
// 都「讀」這裡寫到 <html> 上的變數，不各自再開 listener。這樣 cursor、
// 背景、版面三者天然同步，效能也只付一次 pointer/rAF 成本。
//
// 寫到 documentElement 的契約（單位）：
//   --lens-x / --lens-y       平滑後的儀器座標（px，帶儀器延遲）
//   --ptr-x  / --ptr-y        原始游標座標（px，幾乎即時）
//   --ptr-nx / --ptr-ny       原始游標的視窗正規化座標（0–1）
//   --ptr-vx / --ptr-vy       游標速度（px/frame，給背景做拖尾位移）
//   --ptr-speed               速度量值（0–1 clamp，驅動背景擾動強度）
//   --scroll-progress         全頁捲動進度（0–1）
//   --page-scroll             全頁捲動量（px）
// 以及 data attribute：
//   data-archive-active="true"   surface 已掛載（CSS 用來 gate 隱藏系統游標）
//   data-era="1970s"…            目前作用中的年代場景（由 EraScene 設定）
//   data-lens="idle|hover|…"     游標狀態（由 ArchiveLens 設定）

import { useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ReactiveArchiveBackground } from './ReactiveArchiveBackground'
import { pointer } from './pointerStore'

export function InteractiveSurface({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = document.documentElement
    root.setAttribute('data-archive-active', 'true')

    let w = window.innerWidth
    let h = window.innerHeight

    // 原始游標 + 平滑「儀器」座標
    let rx = w / 2
    let ry = h / 2
    let lx = rx
    let ly = ry
    let prevLx = lx
    let prevLy = ly

    // reduced-motion：不做儀器延遲（lerp=1），背景那側也會自行降級
    const ease = prefersReduced ? 1 : 0.16

    const onMove = (e: PointerEvent) => {
      rx = e.clientX
      ry = e.clientY
    }
    const onResize = () => {
      w = window.innerWidth
      h = window.innerHeight
    }

    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      pointer.scroll = progress
      root.style.setProperty('--scroll-progress', progress.toFixed(4))
      root.style.setProperty('--page-scroll', `${window.scrollY}px`)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    let raf = 0
    const tick = () => {
      lx += (rx - lx) * ease
      ly += (ry - ly) * ease

      const vx = lx - prevLx
      const vy = ly - prevLy
      prevLx = lx
      prevLy = ly
      const speed = Math.min(1, Math.hypot(vx, vy) / 38)

      // 同步寫入共享 store（給背景 canvas 讀，免去 getComputedStyle）
      pointer.lx = lx
      pointer.ly = ly
      pointer.rx = rx
      pointer.ry = ry
      pointer.nx = rx / w
      pointer.ny = ry / h
      pointer.speed = speed

      root.style.setProperty('--lens-x', `${lx.toFixed(2)}px`)
      root.style.setProperty('--lens-y', `${ly.toFixed(2)}px`)
      root.style.setProperty('--ptr-x', `${rx.toFixed(2)}px`)
      root.style.setProperty('--ptr-y', `${ry.toFixed(2)}px`)
      root.style.setProperty('--ptr-nx', (rx / w).toFixed(4))
      root.style.setProperty('--ptr-ny', (ry / h).toFixed(4))
      root.style.setProperty('--ptr-vx', vx.toFixed(2))
      root.style.setProperty('--ptr-vy', vy.toFixed(2))
      root.style.setProperty('--ptr-speed', speed.toFixed(3))

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      root.removeAttribute('data-archive-active')
      root.removeAttribute('data-era')
    }
  }, [prefersReduced])

  return (
    <>
      <ReactiveArchiveBackground />
      {children}
    </>
  )
}
