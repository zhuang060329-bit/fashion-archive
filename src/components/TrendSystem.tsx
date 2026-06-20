'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { trends } from '@/data/trends'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// 僅顯示 trend statement，不顯示 description（全長文字太重）
// 顯示：statement + eras coverage + case count
export function TrendSystem() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="px-6 md:px-10 py-20 md:py-28"
      style={{ borderTop: '1px solid var(--line-color)' }}
      aria-label="Trend intelligence system"
    >
      {/* Section header */}
      <div className="flex items-baseline gap-8 mb-12">
        <p className="type-mono-xs" style={{ color: 'var(--color-archive-600)' }}>
          ——TREND INTELLIGENCE——
        </p>
        <p className="type-mono-xs" style={{ color: 'var(--color-archive-700)' }}>
          {trends.length} CROSS-ERA PATTERNS
        </p>
      </div>

      {/* Trend list — accordion style, editorial not tabbed */}
      <div
        className="space-y-0"
        style={{ maxWidth: '60rem' }}
        role="list"
      >
        {trends.map((trend, i) => {
          const isActive = activeId === trend.id

          return (
            <div
              key={trend.id}
              role="listitem"
              style={{ borderTop: '1px solid var(--line-color)' }}
            >
              {/* Trend row — click to expand */}
              <button
                data-cursor="VIEW"
                onClick={() => setActiveId(isActive ? null : trend.id)}
                aria-expanded={isActive}
                className="w-full text-left"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2.5rem minmax(0, 1fr) auto',
                  alignItems: 'baseline',
                  gap: '1.5rem',
                  padding: '1.25rem 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {/* Index number */}
                <span
                  className="type-mono-xs"
                  style={{ color: 'var(--color-archive-700)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Trend name */}
                <span
                  className="type-chapter"
                  style={{
                    fontSize: 'clamp(1.1rem, 2.2vw, 1.75rem)',
                    lineHeight: 1.05,
                    color: isActive ? 'var(--color-archive-white)' : 'var(--color-archive-200)',
                    transition: 'color 0.25s',
                  }}
                >
                  {trend.name}
                </span>

                {/* Era coverage + expand indicator */}
                <span
                  className="type-mono-xs flex items-center gap-3"
                  style={{ color: 'var(--color-archive-600)' }}
                >
                  <span className="hidden md:inline">
                    {trend.eras.length} ERAS
                  </span>
                  <span
                    style={{
                      display: 'inline-block',
                      transform: isActive ? 'rotate(45deg)' : 'none',
                      transition: 'transform 0.3s',
                    }}
                  >
                    +
                  </span>
                </span>
              </button>

              {/* Expanded content */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="expand-grid-2-1 pb-8 grid gap-6 md:gap-8">
                      {/* Left: statement + description excerpt */}
                      <motion.div
                        className="space-y-4"
                        initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12, duration: 0.45 }}
                      >
                        <p
                          className="type-statement"
                          style={{
                            fontStyle: 'italic',
                            color: 'var(--color-archive-200)',
                            fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                          }}
                        >
                          &ldquo;{trend.statement}&rdquo;
                        </p>
                        <p className="type-statement">
                          {trend.description.slice(0, 360)}…
                        </p>
                      </motion.div>

                      {/* Right: metadata */}
                      <motion.div
                        className="space-y-5"
                        initial={prefersReduced ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        <div>
                          <p className="type-mono-xs mb-2" style={{ color: 'var(--color-archive-600)' }}>
                            ERA COVERAGE
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {trend.eras.map((era) => (
                              <span key={era} className="keyword-tag">{era}</span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="type-mono-xs mb-2" style={{ color: 'var(--color-archive-600)' }}>
                            CASE REFS
                          </p>
                          <div className="space-y-1">
                            {trend.caseRefs.map((ref) => (
                              <p key={ref} className="type-mono-xs break-word" style={{ color: 'var(--color-archive-500)' }}>
                                {ref}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="type-mono-xs mb-1" style={{ color: 'var(--color-archive-600)' }}>
                            CATEGORY
                          </p>
                          <p className="type-mono-xs" style={{ color: 'var(--color-archive-400)' }}>
                            /{trend.category}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}

        {/* Closing rule */}
        <div style={{ borderTop: '1px solid var(--line-color)' }} />
      </div>
    </section>
  )
}
