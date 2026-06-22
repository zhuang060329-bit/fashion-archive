'use client'

// ReactiveArchiveBackground — 整站「材料表面」。不是裝飾貼圖、不是星空粒子、
// 不是 SaaS gradient blob。四層，由後到前：
//   1. era base       —— 年代色底，由 <html data-era> 經 CSS 切換（見 globals）
//   2. fiber canvas   —— textile 纖維場：短線段（不是圓點）緩慢飄移，靠近
//                        lens 受光提亮、被游標速度擾動，色相 lerp 到當前年代
//   3. cursor bloom   —— 跟隨 lens 的柔光暈（純 CSS，讀 --lens-x/--lens-y）
//   4. grain          —— 細顆粒膠片質感
//
// 纖維 = 布料/灰塵在光束裡的視覺，與「材料檔案」本體一致；刻意避開圓形
// 粒子（星空感）、滿版漸層、霓虹。reduced-motion 下只畫一張靜止幀、不開 rAF。

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { pointer, ripples } from './pointerStore'

// 年代色（RGB），canvas 纖維色相會 lerp 到目前 data-era 對應值。
// 對齊 globals 的 --color-era-* 但這裡要 numeric 給 canvas 用。
const ERA_RGB: Record<string, [number, number, number]> = {
  default: [122, 122, 106], // archive-400 暖灰
  '1970s': [201, 169, 110], // 琥珀
  '1980s': [212, 175, 55], // 金
  '1990s': [142, 142, 126], // 冷灰（void）
  '2000s': [184, 134, 11], // goldenrod flash
  '2010s': [230, 50, 35], // signal red
  '2020s': [155, 139, 122], // 靜默暖灰
}

export function ReactiveArchiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = 1

    type Fiber = { x: number; y: number; len: number; ang: number; drift: number; phase: number }
    let fibers: Fiber[] = []

    const seed = () => {
      // 纖維密度依面積，但 cap 住避免大螢幕爆量
      const count = Math.min(110, Math.round((w * h) / 22000))
      fibers = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        len: 6 + Math.random() * 22,
        ang: Math.random() * Math.PI,
        drift: 0.08 + Math.random() * 0.22,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }
    resize()

    // 目前色相（lerp 目標 = 當前年代）
    let cr = ERA_RGB.default[0]
    let cg = ERA_RGB.default[1]
    let cb = ERA_RGB.default[2]

    const drawFrame = (t: number) => {
      ctx.clearRect(0, 0, w, h)

      // 年代色平滑過渡
      const era = document.documentElement.dataset.era ?? 'default'
      const target = ERA_RGB[era] ?? ERA_RGB.default
      cr += (target[0] - cr) * 0.04
      cg += (target[1] - cg) * 0.04
      cb += (target[2] - cb) * 0.04

      const lx = pointer.lx || w / 2
      const ly = pointer.ly || h / 2
      const agitation = pointer.speed // 0–1
      const scanning = pointer.scanning
      const now = performance.now()

      for (const f of fibers) {
        // 緩慢飄移 + 受游標速度擾動的角度抖動
        f.phase += f.drift * 0.02
        const sway = Math.sin(f.phase + t * 0.0004) * (1.4 + agitation * 6)
        f.x += Math.cos(f.ang) * f.drift * 0.4 + agitation * (Math.random() - 0.5) * 1.2
        f.y += Math.sin(f.ang) * f.drift * 0.4 + sway * 0.04

        // wrap
        if (f.x < -30) f.x = w + 30
        if (f.x > w + 30) f.x = -30
        if (f.y < -30) f.y = h + 30
        if (f.y > h + 30) f.y = -30

        // 與 lens 的距離 → 受光提亮（光束裡的纖維）
        const dx = f.x - lx
        const dy = f.y - ly
        const dist = Math.hypot(dx, dy)
        const lit = Math.max(0, 1 - dist / 260)

        // 掃描中：lens 附近纖維被「鏡頭扭曲」——徑向外推 + 切向旋流，
        // 畫出位移後的位置（不改 f 本身，避免永久漂移），形成局部扭曲
        let drawX = f.x
        let drawY = f.y
        let angWarp = 0
        if (scanning && dist < 200 && dist > 0.1) {
          const push = (1 - dist / 200) ** 2 * 26
          const nx = dx / dist
          const ny = dy / dist
          drawX += nx * push
          drawY += ny * push
          angWarp = (1 - dist / 200) * 1.2 // 切向旋流
        }

        const baseAlpha = 0.05 + lit * 0.42 + (scanning && dist < 200 ? (1 - dist / 200) * 0.3 : 0)
        const a = f.ang + sway * 0.04 + angWarp
        const hl = f.len * (0.6 + lit * 0.8)
        ctx.strokeStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${Math.min(1, baseAlpha).toFixed(3)})`
        ctx.lineWidth = lit > 0.4 || (scanning && dist < 120) ? 1.1 : 0.7
        ctx.beginPath()
        ctx.moveTo(drawX - Math.cos(a) * hl * 0.5, drawY - Math.sin(a) * hl * 0.5)
        ctx.lineTo(drawX + Math.cos(a) * hl * 0.5, drawY + Math.sin(a) * hl * 0.5)
        ctx.stroke()
      }

      // lens 附近的柔性掃描光暈（疊在纖維上，極淡）
      const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, 240)
      grad.addColorStop(0, `rgba(${cr | 0},${cg | 0},${cb | 0},${scanning ? 0.12 : 0.06})`)
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // ripple 環：鎖定物件瞬間從該點擴散的同心環，隨年齡淡出
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]
        const age = now - rp.start
        const life = 1300
        if (age > life) { ripples.splice(i, 1); continue }
        const p = age / life
        const radius = p * 320
        const alpha = (1 - p) * 0.5
        ctx.strokeStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${alpha.toFixed(3)})`
        ctx.lineWidth = 1.4 * (1 - p) + 0.4
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, radius, 0, Math.PI * 2)
        ctx.stroke()
        // 第二圈內環，錯開相位
        ctx.globalAlpha = 0.5
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, radius * 0.6, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = 1
      }
    }

    window.addEventListener('resize', resize, { passive: true })

    let raf = 0
    if (prefersReduced) {
      // 靜止單幀：纖維不動、無光暈擾動，仍呈現材料質感
      drawFrame(0)
    } else {
      const loop = (t: number) => {
        drawFrame(t)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [prefersReduced])

  return (
    <div className="archive-bg" aria-hidden="true">
      <div className="archive-bg-base" />
      <canvas ref={canvasRef} className="archive-bg-canvas" />
      <div className="archive-bg-bloom" />
      <div className="archive-bg-grain" />
    </div>
  )
}
