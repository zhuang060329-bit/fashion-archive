'use client'

// ClosingThesis — 不是普通 footer。把六個年代的「機制」收束回一條 thesis：
// 六個動詞（allegiance → structure → refusal → image → signal → silence）
// 排成一行壓縮的 archive ending，cursor 掃過會在底部留下一道 material trace。

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ERA_MECHANISMS, SITE_THESIS } from '@/data/thesis'

export function ClosingThesis() {
  const rootRef = useRef<HTMLElement>(null)
  const traceRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(
    () => {
      // 進入結尾時把 data-era 清掉，背景回到 default 色
      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 55%',
        onToggle: (self) => {
          if (self.isActive) delete document.documentElement.dataset.era
        },
      })

      if (prefersReduced) return () => st.kill()

      gsap.from('.closing-word', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
      })

      return () => st.kill()
    },
    { scope: rootRef, dependencies: [prefersReduced] },
  )

  // cursor 掃過底部時留下 material trace（accent 細線寬度跟隨游標 x）
  const onPointerMove = (e: React.PointerEvent) => {
    if (prefersReduced || !traceRef.current) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    traceRef.current.style.width = `${Math.max(0, Math.min(1, px)) * 100}%`
  }

  return (
    <section
      ref={rootRef}
      className="closing-thesis"
      aria-label="Closing"
      onPointerMove={onPointerMove}
    >
      <p className="type-mono-xs closing-kicker">SIX MECHANISMS · ONE BODY UNDERNEATH</p>

      <h2 className="closing-line">
        {ERA_MECHANISMS.map((m, i) => (
          <span key={m.id} className="closing-word">
            {m.mechanism}
            {i < ERA_MECHANISMS.length - 1 && <span className="closing-sep">/</span>}
          </span>
        ))}
      </h2>

      <p className="closing-body">{SITE_THESIS.lead}</p>

      <div className="closing-trace-track" aria-hidden="true">
        <div ref={traceRef} className="closing-trace" />
      </div>

      <p className="type-mono-xs closing-disclaimer">
        FASHION ARCHIVE — INDEPENDENT EDITORIAL PROJECT. SELECTED FRAGMENTS, NOT A
        COMPLETE CHRONOLOGY. NOT AFFILIATED WITH ANY BRAND OR DESIGNER REFERENCED.
      </p>
    </section>
  )
}
