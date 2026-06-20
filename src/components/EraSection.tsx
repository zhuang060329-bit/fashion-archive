'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getCasesByEra } from '@/data/cases'
import { SourceMarker } from '@/components/SourceMarker'
import type { Era } from '@/data/types'

export type EraLayout = 'left-index' | 'full-title' | 'overlay'

interface EraProps {
  era: Era
  layout?: EraLayout
  index: number
}

const MAX_CASES = 3

export function EraSection({ era, layout = 'left-index', index: _index }: EraProps) {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const [expandedCase, setExpandedCase] = useState<string | null>(null)

  const cases = getCasesByEra(era.id).slice(0, MAX_CASES)
  const accentColor = era.colorProfile.accent ?? 'var(--color-archive-400)'

  useGSAP(
    () => {
      if (prefersReduced) return

      // Era number 視差 — scrub 滾動上移
      gsap.to('.era-num-bg', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // 分段 reveal timeline — 比 Phase 2 的 stagger batch 更刻意
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power2.out' },
      })

      // index/metadata 先出現
      tl.from('.era-reveal-meta', { opacity: 0, duration: 0.5 })
        // 大標題從下方揭露，帶更大位移
        .from('.era-reveal-title', { y: 32, opacity: 0, duration: 1.0, ease: 'power3.out' }, '-=0.2')
        // statement
        .from('.era-reveal-body', { y: 16, opacity: 0, duration: 0.75, stagger: 0.1 }, '-=0.5')
        // 其餘項目
        .from('.era-reveal-rest', { y: 12, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.4')
    },
    { scope: containerRef, dependencies: [prefersReduced, era.id] },
  )

  const sectionStyle = {
    '--era-accent': accentColor,
    borderTop: '1px solid var(--line-color)',
    paddingTop: '5rem',
    paddingBottom: '5rem',
  } as React.CSSProperties

  return (
    <section
      ref={containerRef}
      id={`era-${era.id}`}
      className="relative px-6 md:px-10"
      style={sectionStyle}
      aria-label={`Era: ${era.period}`}
    >
      {layout === 'left-index' && (
        <LeftIndexLayout
          era={era}
          cases={cases}
          expandedCase={expandedCase}
          setExpandedCase={setExpandedCase}
        />
      )}
      {layout === 'full-title' && (
        <FullTitleLayout
          era={era}
          cases={cases}
          expandedCase={expandedCase}
          setExpandedCase={setExpandedCase}
        />
      )}
      {layout === 'overlay' && (
        <OverlayLayout
          era={era}
          cases={cases}
          expandedCase={expandedCase}
          setExpandedCase={setExpandedCase}
        />
      )}
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   LAYOUT: LEFT-INDEX — 1970s, 1980s
   ───────────────────────────────────────────────────────────── */

function LeftIndexLayout({ era, cases, expandedCase, setExpandedCase }: LayoutProps) {
  return (
    <div className="era-grid-left-index grid gap-8 md:gap-12">
      {/* Left: era number + metadata */}
      <div className="relative">
        {/* era-num 在 left-index 版型使用 era-accent 低透明度，比 archive-800 更可辨識 */}
        <div
          className="era-num-bg type-era-num select-none"
          aria-hidden="true"
          style={{ color: 'var(--era-accent)', opacity: 0.18 }}
        >
          {era.id.replace('s', '')}
        </div>
        <div className="era-reveal-meta mt-4 space-y-1">
          <p className="type-mono-xs" style={{ color: 'var(--era-accent)' }}>
            {era.caseIndex}
          </p>
          <p className="type-mono-sm">{era.period}</p>
        </div>
        <div
          className="era-reveal-meta mt-8 hidden md:block"
          style={{ height: '1px', width: '2.5rem', background: 'var(--era-accent)' }}
        />
      </div>

      {/* Right: title, statement, keywords, cases */}
      <div className="space-y-8">
        <div className="era-reveal-title">
          <p className="type-mono-xs mb-3" style={{ color: 'var(--color-archive-500)' }}>
            CHAPTER {String(era.decade / 10 - 196).padStart(2, '0')}
          </p>
          <h2 className="type-chapter" style={{ color: 'var(--color-archive-white)' }}>
            {era.title}
          </h2>
        </div>

        <p className="era-reveal-body type-statement" style={{ maxWidth: '30rem' }}>
          {era.statement}
        </p>

        <div className="era-reveal-body flex flex-wrap gap-2">
          {era.visualKeywords.slice(0, 5).map((kw) => (
            <span key={kw} className="keyword-tag">{kw}</span>
          ))}
        </div>

        <div className="era-reveal-rest space-y-0">
          <p className="type-mono-xs mb-4" style={{ color: 'var(--color-archive-600)' }}>
            CASE FRAGMENTS — {era.id.toUpperCase()}
          </p>
          <div className="space-y-px">
            {cases.map((c) => (
              <CaseFragment
                key={c.id}
                caseItem={c}
                isExpanded={expandedCase === c.id}
                onToggle={() => setExpandedCase(expandedCase === c.id ? null : c.id)}
              />
            ))}
          </div>
        </div>

        <div className="era-reveal-rest">
          <p className="type-mono-xs mb-2" style={{ color: 'var(--color-archive-600)' }}>
            TREND TAGS
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {era.trendTags.map((tag) => (
              <span key={tag} className="type-mono-xs" style={{ color: 'var(--color-archive-500)' }}>
                /{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   LAYOUT: FULL-TITLE — 1990s, 2000s
   ───────────────────────────────────────────────────────────── */

function FullTitleLayout({ era, cases, expandedCase, setExpandedCase }: LayoutProps) {
  return (
    <div className="space-y-10">
      <div className="era-reveal-meta flex items-baseline gap-6">
        <span className="type-mono-xs" style={{ color: 'var(--era-accent)' }}>
          {era.caseIndex}
        </span>
        <span className="type-mono-sm">{era.period}</span>
        <span
          className="flex-1 hidden md:block"
          style={{ borderTop: '1px solid var(--line-color)', marginTop: '0.15rem' }}
        />
      </div>

      <div className="era-reveal-title relative overflow-hidden">
        <div
          className="era-num-bg type-era-num absolute -right-4 top-0 select-none"
          aria-hidden="true"
          style={{
            // 原本 opacity 0.05 + 預設 archive-800 在 1990s/2020s 幾乎完全不可見，
            // 比 overlay 版型（1980s/2010s）的 accent 數字弱得多。改用 accent 色 +
            // 稍高 opacity，與其他版型的「可見但低調」一致，2020s 不再是六章最弱的一個
            color: 'var(--era-accent)',
            opacity: 0.1,
          }}
        >
          {era.id.replace('s', '')}
        </div>
        <p className="type-mono-xs mb-4" style={{ color: 'var(--color-archive-500)' }}>
          CHAPTER {String(era.decade / 10 - 196).padStart(2, '0')}
        </p>
        <h2 className="type-chapter relative z-[var(--z-content)]" style={{ color: 'var(--color-archive-white)' }}>
          {era.title}
        </h2>
      </div>

      <div className="expand-grid-2-1 era-reveal-body grid gap-6 md:gap-8">
        <p className="type-statement">{era.statement}</p>
        <div className="flex flex-wrap content-start gap-2">
          {era.visualKeywords.slice(0, 4).map((kw) => (
            <span key={kw} className="keyword-tag">{kw}</span>
          ))}
        </div>
      </div>

      <div className="era-reveal-rest">
        <p className="type-mono-xs mb-4" style={{ color: 'var(--color-archive-600)' }}>
          CASE FRAGMENTS — {era.id.toUpperCase()}
        </p>
        <div className="era-grid-case-full grid gap-px">
          {cases.map((c) => (
            <CaseFragmentCompact
              key={c.id}
              caseItem={c}
              isExpanded={expandedCase === c.id}
              onToggle={() => setExpandedCase(expandedCase === c.id ? null : c.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   LAYOUT: OVERLAY — 2010s, 2020s
   ───────────────────────────────────────────────────────────── */

function OverlayLayout({ era, cases, expandedCase, setExpandedCase }: LayoutProps) {
  return (
    <div className="relative">
      <div
        className="era-num-bg type-era-num absolute left-0 top-0 select-none leading-none"
        aria-hidden="true"
        style={{
          // overlay variant 跨 1980s（金）/ 2010s（紅）兩種 accent；用 accent 色 + 統一 opacity
          // 取代原本固定 archive-800，讓低飽和紅在暗背景下仍可辨識，但不到霓虹紅的程度
          color: 'var(--era-accent)',
          opacity: 0.12,
          fontSize: 'clamp(8rem, 28vw, 22rem)',
          lineHeight: 1,
          pointerEvents: 'none',
        }}
      >
        {era.id.replace('s', '')}
      </div>

      <div className="relative z-[var(--z-content)] space-y-8">
        <div className="era-reveal-meta flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="type-mono-xs mb-2" style={{ color: 'var(--era-accent)' }}>
              {era.caseIndex} — {era.period}
            </p>
            <p className="type-mono-xs mb-4" style={{ color: 'var(--color-archive-500)' }}>
              CHAPTER {String(era.decade / 10 - 196).padStart(2, '0')}
            </p>
            <h2 className="type-chapter era-reveal-title">{era.title}</h2>
          </div>
          <div
            style={{
              height: '1px',
              flex: '1',
              maxWidth: '8rem',
              background: 'var(--era-accent)',
              marginBottom: '0.5rem',
            }}
            className="hidden md:block"
          />
        </div>

        <p className="era-reveal-body type-statement" style={{ maxWidth: '28rem' }}>
          {era.statement}
        </p>

        <div className="era-reveal-body flex flex-wrap gap-2">
          {era.visualKeywords.slice(0, 6).map((kw) => (
            <span key={kw} className="keyword-tag">{kw}</span>
          ))}
        </div>

        <div className="era-reveal-rest space-y-px">
          <p className="type-mono-xs mb-4" style={{ color: 'var(--color-archive-600)' }}>
            CASE FRAGMENTS
          </p>
          {cases.map((c) => (
            <CaseFragment
              key={c.id}
              caseItem={c}
              isExpanded={expandedCase === c.id}
              onToggle={() => setExpandedCase(expandedCase === c.id ? null : c.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CASE FRAGMENT — list row, AnimatePresence 展開
   ───────────────────────────────────────────────────────────── */

interface CaseFragmentProps {
  caseItem: ReturnType<typeof getCasesByEra>[0]
  isExpanded: boolean
  onToggle: () => void
}

function CaseFragment({ caseItem, isExpanded, onToggle }: CaseFragmentProps) {
  const primarySource = caseItem.sourceNotes[0]

  return (
    <div
      className="archive-line archive-line-top"
      data-cursor="EXPAND"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        // role="button" 自製元素：Enter 與 Space 都要支援，
        // Space 需 preventDefault，否則瀏覽器預設行為會捲動整頁
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      aria-expanded={isExpanded}
      style={{ cursor: 'pointer' }}
    >
      {/* Collapsed row */}
      <div
        className="flex items-center justify-between py-3 gap-4 transition-opacity duration-200"
        style={{ opacity: isExpanded ? 0.5 : 1 }}
      >
        <span className="type-mono-xs" style={{ color: 'var(--color-archive-600)', flexShrink: 0 }}>
          {caseItem.id}
        </span>
        <span
          className="type-statement flex-1 min-w-0 truncate"
          style={{ color: 'var(--color-archive-200)', fontSize: '0.8rem' }}
        >
          {caseItem.title}
        </span>
        <span className="type-mono-xs" style={{ color: 'var(--color-archive-600)', flexShrink: 0 }}>
          {caseItem.year}
        </span>
        <span
          className="type-mono-xs transition-transform duration-300"
          style={{
            color: 'var(--color-archive-500)',
            transform: isExpanded ? 'rotate(45deg)' : 'none',
            flexShrink: 0,
          }}
        >
          +
        </span>
      </div>

      {/* AnimatePresence 展開區 */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="case-detail-grid pb-5 pt-2 grid gap-4">
              {/* Left metadata */}
              <motion.div
                className="space-y-3"
                style={{ minWidth: '7rem' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.4 }}
              >
                {caseItem.brand && (
                  <div>
                    <p className="type-mono-xs" style={{ color: 'var(--color-archive-600)' }}>BRAND</p>
                    <p className="type-mono-xs mt-0.5" style={{ color: 'var(--color-archive-300)' }}>
                      {caseItem.brand}
                    </p>
                  </div>
                )}
                {caseItem.designer && (
                  <div>
                    <p className="type-mono-xs" style={{ color: 'var(--color-archive-600)' }}>DESIGNER</p>
                    <p className="type-mono-xs mt-0.5" style={{ color: 'var(--color-archive-300)' }}>
                      {caseItem.designer}
                    </p>
                  </div>
                )}
                <div>
                  <p className="type-mono-xs" style={{ color: 'var(--color-archive-600)' }}>TYPE</p>
                  <p className="type-mono-xs mt-0.5" style={{ color: 'var(--color-archive-300)' }}>
                    {caseItem.type.replace(/-/g, ' ')}
                  </p>
                </div>
              </motion.div>

              {/* Right: statement + context + source confidence */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.45 }}
              >
                <p
                  className="type-statement"
                  style={{ fontStyle: 'italic', color: 'var(--color-archive-200)' }}
                >
                  &ldquo;{caseItem.statement}&rdquo;
                </p>
                <p className="type-statement">{caseItem.context.slice(0, 320)}…</p>

                {primarySource && (
                  <SourceMarker confidence={primarySource.confidence} source={primarySource.source} />
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CASE FRAGMENT COMPACT — grid cell (full-title layout)
   ───────────────────────────────────────────────────────────── */

function CaseFragmentCompact({ caseItem, isExpanded, onToggle }: CaseFragmentProps) {
  return (
    <div
      className="group p-4 transition-colors duration-300"
      data-cursor="EXPAND"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        // role="button" 自製元素：Enter 與 Space 都要支援，
        // Space 需 preventDefault，否則瀏覽器預設行為會捲動整頁
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      aria-expanded={isExpanded}
      style={{
        cursor: 'pointer',
        borderLeft: isExpanded ? '1px solid var(--era-accent)' : '1px solid var(--line-color)',
        paddingLeft: '1rem',
        background: isExpanded ? 'var(--color-archive-900)' : 'transparent',
        transition: 'border-color 0.3s, background 0.3s',
      }}
    >
      <p className="type-mono-xs mb-2" style={{ color: 'var(--color-archive-600)' }}>
        {caseItem.id}
      </p>
      <p className="type-statement mb-2" style={{ fontSize: '0.78rem', color: 'var(--color-archive-200)' }}>
        {caseItem.title}
      </p>
      <p className="type-mono-xs" style={{ color: 'var(--color-archive-500)' }}>
        {caseItem.year} — {caseItem.type.replace(/-/g, ' ')}
      </p>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="type-statement mt-3" style={{ fontSize: '0.75rem' }}>
              {caseItem.context.slice(0, 200)}…
            </p>
            {caseItem.sourceNotes[0] && (
              <SourceMarker confidence={caseItem.sourceNotes[0].confidence} size="compact" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SHARED TYPES
   ───────────────────────────────────────────────────────────── */

interface LayoutProps {
  era: Era
  cases: ReturnType<typeof getCasesByEra>
  expandedCase: string | null
  setExpandedCase: (id: string | null) => void
}
