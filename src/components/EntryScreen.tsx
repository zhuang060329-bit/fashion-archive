'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const META = {
  index: '——001——',
  classification: 'TREND ANALYSIS',
  period: '1970 — 2020s',
  caseCount: '024',
  garmentCount: '010',
}

export function EntryScreen() {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return

      // ── 進場動畫 ─────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.entry-header-item', { opacity: 0, duration: 0.6, stagger: 0.08 })
        .from(
          '.entry-title-word',
          { y: 60, opacity: 0, duration: 1.1, stagger: 0.14 },
          '-=0.2',
        )
        .from('.entry-statement', { opacity: 0, y: 16, duration: 0.8 }, '-=0.5')
        .from('.entry-footer-item', { opacity: 0, duration: 0.6, stagger: 0.06 }, '-=0.4')

      // ── 捲動敘事 — 使用者離開第一屏時 ────────────────────────
      // title words: 向上漂移並淡出
      gsap.to('.entry-title-word', {
        y: -70,
        opacity: 0,
        ease: 'none',
        overwrite: 'auto',
        stagger: { each: 0.04, from: 'start' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '65% top',
          scrub: 1.2,
        },
      })

      // statement 更早淡出，讓標題先走
      gsap.to('.entry-statement', {
        opacity: 0,
        y: -20,
        ease: 'none',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '35% top',
          scrub: 1,
        },
      })

      // header/footer strip 最後消失
      gsap.to(['.entry-header-item', '.entry-footer-item'], {
        opacity: 0,
        ease: 'none',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: containerRef.current,
          start: '20% top',
          end: '60% top',
          scrub: 1,
        },
      })
    },
    { scope: containerRef, dependencies: [prefersReduced] },
  )

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col"
      style={{ minHeight: '100svh' }}
      aria-label="Fashion Archive — Entry"
    >
      {/* ── Header metadata strip ─────────────────────────────── */}
      <header
        className="archive-line archive-line-bottom flex items-center justify-between px-6 md:px-10"
        style={{ height: '2.75rem' }}
      >
        <span className="entry-header-item type-mono-xs">{META.index}</span>
        <span className="entry-header-item type-mono-xs hidden md:block">
          POST-1970 FASHION HISTORY
        </span>
        <span className="entry-header-item type-mono-xs">
          CLASSIFICATION:&nbsp;{META.classification}
        </span>
      </header>

      {/* ── Main title area ───────────────────────────────────── */}
      {/*
        光學垂直置中：justify-center 是幾何中心，
        大型斜體字視覺重心偏下，故加 paddingBottom 把內容向上推
      */}
      <div
        className="relative flex-1 flex flex-col justify-center px-6 md:px-10 overflow-hidden"
        style={{ paddingBottom: 'clamp(3rem, 9vh, 7rem)' }}
      >
        {/* Corner marks */}
        <div className="absolute inset-6 md:inset-10 pointer-events-none">
          <div className="corner-mark corner-mark-tl" />
          <div className="corner-mark corner-mark-tr" />
          <div className="corner-mark corner-mark-bl" />
          <div className="corner-mark corner-mark-br" />
        </div>

        {/* Dossier file number */}
        <div
          className="absolute top-8 right-6 md:right-10 type-mono-xs text-right"
          style={{ color: 'var(--color-archive-600)' }}
        >
          <div>FILE NO.</div>
          <div
            style={{
              color: 'var(--color-archive-400)',
              fontSize: '1rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
            }}
          >
            POST-1970
          </div>
        </div>

        {/* Main title block */}
        <div className="relative z-10" style={{ maxWidth: '95vw' }}>
          <div
            className="entry-title-word type-hero block overflow-hidden"
            style={{ paddingLeft: 0 }}
          >
            FASHION
          </div>
          <div
            className="entry-title-word type-hero block overflow-hidden"
            style={{
              paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
              marginTop: '-0.05em',
            }}
          >
            ARCHIVE
          </div>

          <div className="entry-statement mt-8 md:mt-10" style={{ maxWidth: '36rem' }}>
            <p className="type-statement">post-1970 trend intelligence</p>
            <p className="type-mono-sm mt-3" style={{ color: 'var(--color-archive-500)' }}>
              {META.period}
            </p>
          </div>
        </div>

        {/* Vertical era range marker — decorative */}
        <div
          className="absolute right-6 md:right-10 bottom-16 type-mono-xs hidden lg:flex flex-col items-center gap-2"
          style={{
            writingMode: 'vertical-rl',
            letterSpacing: '0.2em',
            color: 'var(--color-archive-600)',
          }}
        >
          1970 ↓ 2020s
        </div>
      </div>

      {/* ── Footer data strip ────────────────────────────────── */}
      <footer
        className="archive-line archive-line-top flex items-center justify-between px-6 md:px-10"
        style={{ height: '2.75rem' }}
      >
        <span className="entry-footer-item type-mono-xs">
          ERA COVERAGE:&nbsp;{META.period}
        </span>
        <span className="entry-footer-item type-mono-xs hidden sm:block">
          CASES:&nbsp;{META.caseCount}&nbsp;&nbsp;GARMENTS:&nbsp;{META.garmentCount}
        </span>
        <span className="entry-footer-item type-mono-xs flex items-center gap-2">
          <span style={{ color: 'var(--color-archive-600)' }}>STATUS:</span>
          <span>OPEN</span>
          <span
            style={{
              display: 'inline-block',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'var(--color-era-20)',
              marginLeft: '0.25rem',
            }}
          />
        </span>
      </footer>
    </section>
  )
}
