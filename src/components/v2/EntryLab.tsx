'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { SpecimenRuler } from '@/components/v2/SpecimenRuler'
import { LabDust } from '@/components/v2/LabDust'

// v2 entry——「材料實驗台啟動」的 opening ritual，不是單純大字 fade-in。
// 時間軸（皆對應 globals.css 的 motion grammar 變數，這裡寫死數字是因為
// GSAP duration 吃不到 CSS var，但數值刻意對齊 --duration-calibration /
// --duration-scan-sweep）：
//   0.0s            calibration grid 開始顯影（1.1s）
//   0.25s           scanner beam 由上往下掃過一次（0.9s），途中點亮三個
//                    輪廓浮水印 + 揚起 dust fiber
//   0.65s           lab-plate 樣本欄以「校準鎖定」位移進場（overshoot）
//   0.55s           標題用 clip-path 顯影 + 邊緣高光線同步移動（1.3s），
//                    不是 blur/fade-in
//   1.1s            副標用 Motion Primitives TextEffect 逐字 fade-in-blur
export function EntryLab() {
  const containerRef = useRef<HTMLElement>(null)
  const titleWrapRef = useRef<HTMLDivElement>(null)
  const titleEdgeRef = useRef<HTMLDivElement>(null)
  const beamRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const swatches = [
    { label: 'ERA RANGE', value: '1970 — 2020s' },
    { label: 'CASES LOGGED', value: '024' },
    { label: 'GARMENTS LOGGED', value: '010' },
    { label: 'STATUS', value: 'LAB OPEN' },
  ]

  useGSAP(
    () => {
      if (prefersReduced) {
        // reduced-motion：直接顯示最終狀態，不跑任何 timeline
        // （輪廓浮水印的閒置透明度由 inline style 直接設定，這裡不覆寫）
        gsap.set('.lab-title-develop', { clipPath: 'inset(0 0% 0 0)' })
        gsap.set('.lab-title-develop-inner', { filter: 'blur(0px)' })
        gsap.set(['.lab-swatch', '.lab-grid-line'], { opacity: 1 })
        return
      }

      const beam = beamRef.current
      const titleEdge = titleEdgeRef.current

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      // 1. calibration grid 顯影
      tl.fromTo('.lab-grid-line', { opacity: 0 }, { opacity: 1, duration: 1.1, ease: 'none' }, 0)

      // 2. scanner beam 掃過一次，途中點亮輪廓浮水印 + dust
      if (beam) {
        tl.fromTo(
          beam,
          { top: '-5%', opacity: 0 },
          { top: '0%', opacity: 1, duration: 0.15, ease: 'power1.in' },
          0.25,
        ).to(beam, { top: '105%', duration: 0.9, ease: 'power1.inOut' }, 0.4)
          .to(beam, { opacity: 0, duration: 0.2 }, 1.1)
      }
      tl.fromTo(
        '.lab-silhouette-icon',
        { opacity: 0 },
        { opacity: 0.6, duration: 0.25, stagger: 0.18, ease: 'power1.out' },
        0.45,
      ).to('.lab-silhouette-icon', { opacity: 0.22, duration: 0.5, stagger: 0.18 }, 0.8)

      tl.fromTo(
        '.lab-dust',
        { opacity: 0 },
        { opacity: 0.5, duration: 0.4, stagger: { each: 0.04, from: 'random' }, ease: 'power1.inOut' },
        0.3,
      ).to('.lab-dust', { opacity: 0, duration: 0.6, stagger: { each: 0.03, from: 'random' } }, 0.9)

      // 3. lab-plate 樣本欄——校準鎖定位移，帶輕微 overshoot，不是普通 slide-in
      tl.fromTo(
        '.lab-plate',
        { opacity: 0, x: -28 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'back.out(1.4)' },
        0.5,
      )
      tl.fromTo(
        '.lab-swatch',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out' },
        0.7,
      )

      // 4. 標題 scan-develop：clip-path 由左往右顯影 + 邊緣高光線同步移動，
      //    同時 filter blur 從重到無——「被掃描曝光顯影」而不是 fade/blur-in
      tl.fromTo(
        '.lab-title-develop',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power2.inOut' },
        0.55,
      )
      tl.fromTo(
        '.lab-title-develop-inner',
        { filter: 'blur(14px)' },
        { filter: 'blur(0px)', duration: 1.3, ease: 'power2.out' },
        0.55,
      )
      if (titleEdge) {
        tl.fromTo(
          titleEdge,
          { left: '0%', opacity: 1 },
          { left: '100%', duration: 1.3, ease: 'power2.inOut' },
          0.55,
        ).to(titleEdge, { opacity: 0, duration: 0.25 }, 1.7)
      }

      tl.fromTo(
        '.lab-statement',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.0,
      )

      // 退場視差：離開首屏時樣本格往不同方向漂移，製造「被收回抽屜」的錨點感
      gsap.to('.lab-swatch', {
        y: -40,
        opacity: 0,
        ease: 'none',
        stagger: { each: 0.03, from: 'edges' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 1.2,
        },
      })
    },
    { scope: containerRef, dependencies: [prefersReduced] },
  )

  return (
    <section
      ref={containerRef}
      className="relative grid overflow-hidden"
      style={{
        minHeight: '100svh',
        gridTemplateColumns: 'minmax(200px, 0.24fr) 1fr',
        borderBottom: '1px solid var(--line-color)',
      }}
      aria-label="Fashion Archive — Material Lab Entry"
    >
      {/* lab grid background — 細格線暗示「實驗台」而非裝飾性漸層 */}
      <div
        className="lab-grid-line pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(var(--line-color) 1px, transparent 1px), linear-gradient(90deg, var(--line-color) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0,
        }}
      />

      {/* scanner beam — opening ritual 用，掃過一次後維持 opacity:0 待命 */}
      <div
        ref={beamRef}
        className="pointer-events-none absolute left-0 right-0 z-20"
        aria-hidden="true"
        style={{
          top: '-5%',
          height: '2px',
          opacity: 0,
          background: 'var(--color-archive-white)',
          boxShadow: '0 0 28px 6px color-mix(in oklch, var(--color-archive-white) 55%, transparent)',
        }}
      />

      {/* dust field — 只在 beam 路徑帶狀區域，不是滿版飄浮 */}
      <LabDust count={16} className="z-10" />

      {/* corner marks */}
      <div className="pointer-events-none absolute inset-6 md:inset-10" aria-hidden="true">
        <div className="corner-mark corner-mark-tl" />
        <div className="corner-mark corner-mark-tr" />
        <div className="corner-mark corner-mark-bl" />
        <div className="corner-mark corner-mark-br" />
      </div>

      {/* LEFT — lab control panel，不是空洞的 sidebar：頂部有 live status，
          中段是 specimen log，底部是 calibration bars + ruler，
          上下三段結構填滿欄寬，不留大面積空黑 */}
      <div
        className="lab-plate relative z-10 flex flex-col justify-between px-5 py-8"
        style={{ borderRight: '1px solid var(--line-color)' }}
      >
        {/* 頂部：live status */}
        <div className="lab-swatch flex items-center justify-between">
          <span className="lab-control-panel-status">LAB ONLINE</span>
          <span className="lab-meta-tertiary type-mono-xs">v2.0</span>
        </div>

        {/* 中段：specimen log */}
        <div className="flex flex-col gap-4">
          <p className="lab-meta-tertiary type-mono-xs">——SPECIMEN LOG——</p>
          {swatches.map((s) => (
            <div
              key={s.label}
              className="lab-swatch relative border-t pt-2"
              style={{ borderColor: 'var(--line-color)' }}
            >
              <span className="specimen-pin" aria-hidden="true" style={{ top: '-3px' }} />
              <p className="lab-meta-tertiary type-mono-xs">{s.label}</p>
              <p className="lab-meta-primary type-mono-sm mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>

        {/* 底部：calibration bars + ruler，填補原本空洞的下半段 */}
        <div className="lab-swatch flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="lab-meta-tertiary type-mono-xs">CALIBRATION</span>
            <div className="lab-control-panel-bars" aria-hidden="true">
              {[5, 9, 6, 12, 8, 4, 10, 7].map((h, i) => (
                <span key={i} className="lab-control-panel-bar" style={{ height: `${h}px` }} />
              ))}
            </div>
          </div>
          <SpecimenRuler ticks={10} unit="CM" />
        </div>
      </div>

      {/* RIGHT — title anchored at grid intersection, not centered */}
      <div className="relative z-10 flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-20">
        <p className="type-mono-xs mb-4" style={{ color: 'var(--color-archive-500)' }}>
          FILE NO. POST-1970 — MATERIAL LAB
        </p>

        {/* 標題 scan-develop：clip-path 顯影 + 邊緣高光線，取代純 blur/fade */}
        <div ref={titleWrapRef} className="lab-title-develop relative" style={{ maxWidth: '95vw' }}>
          <div ref={titleEdgeRef} className="lab-title-develop-edge" aria-hidden="true" />
          <h1 className="lab-title-develop-inner type-hero">FASHION ARCHIVE</h1>
        </div>

        <div className="lab-statement mt-6" style={{ maxWidth: '34rem' }}>
          {prefersReduced ? (
            <p className="type-statement">
              A material lab for post-1970 fashion history — garments, trends,
              and cultural objects logged as specimens, not articles.
            </p>
          ) : (
            <TextEffect
              as="p"
              per="word"
              preset="fade-in-blur"
              speedReveal={1.4}
              delay={1.2}
              className="type-statement"
            >
              A material lab for post-1970 fashion history — garments, trends, and cultural objects logged as specimens, not articles.
            </TextEffect>
          )}
        </div>

        {/* silhouette watermark group — 三個抽象輪廓並排，被 beam 掃過時短暫
            點亮，象徵「標本櫃」，不是純文字排版撐版面 */}
        <div className="relative mt-10 flex h-20 items-end gap-8" aria-hidden="true">
          <svg viewBox="0 0 80 96" className="lab-silhouette-icon" style={{ width: '3rem', height: '3.6rem', opacity: prefersReduced ? 0.6 : 0 }}>
            <path
              d="M20 10 L40 4 L60 10 L60 30 L72 36 L72 90 L52 90 L52 50 L48 50 L48 90 L28 90 L28 36 L8 36 L8 30 Z"
              fill="none"
              stroke="var(--color-archive-600)"
              strokeWidth="1.5"
            />
          </svg>
          <svg viewBox="0 0 80 96" className="lab-silhouette-icon" style={{ width: '2.6rem', height: '3.6rem', opacity: prefersReduced ? 0.6 : 0 }}>
            <path
              d="M6 70 H50 C66 70 76 78 76 86 H6 Z M10 70 L16 38 L40 34 L48 50 L48 70 Z"
              fill="none"
              stroke="var(--color-archive-600)"
              strokeWidth="1.5"
            />
          </svg>
          <svg viewBox="0 0 80 96" className="lab-silhouette-icon" style={{ width: '2.6rem', height: '3.6rem', opacity: prefersReduced ? 0.6 : 0 }}>
            <path
              d="M22 28 C22 14 58 14 58 28 V36 H22 Z M14 36 H66 L62 88 H18 Z"
              fill="none"
              stroke="var(--color-archive-600)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
