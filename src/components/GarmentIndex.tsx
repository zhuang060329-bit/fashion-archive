'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { garments } from '@/data/garments'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function GarmentIndex() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="px-6 md:px-10 py-20 md:py-28"
      style={{ borderTop: '1px solid var(--line-color)' }}
      aria-label="Garment index — cultural objects"
    >
      {/* Section header */}
      <div
        className="header-grid-1-2 grid gap-8 md:gap-12 mb-16"
        style={{ maxWidth: '60rem' }}
      >
        <div>
          <p className="type-mono-xs mb-3" style={{ color: 'var(--color-archive-600)' }}>
            ——GARMENT INDEX——
          </p>
          <div style={{ width: '1.75rem', height: '1px', background: 'var(--color-archive-700)', margin: '1rem 0' }} />
          <p className="type-mono-xs hidden md:block" style={{ color: 'var(--color-archive-700)', writingMode: 'vertical-rl', letterSpacing: '0.18em' }}>
            CULTURAL OBJECTS
          </p>
        </div>
        <div style={{ borderLeft: '1px solid var(--color-archive-800)', paddingLeft: 'clamp(1.25rem, 3vw, 2rem)' }}>
          <p className="type-statement" style={{ color: 'var(--color-archive-300)' }}>
            Each garment listed here is a cultural document. It carries the decade it emerged in, the subcultures it absorbed, the economies it served, and the refusals it provoked.
          </p>
        </div>
      </div>

      {/* Garment list */}
      <div style={{ maxWidth: '60rem' }}>
        {garments.map((garment, i) => {
          const isExpanded = expandedId === garment.id

          return (
            <div
              key={garment.id}
              style={{ borderTop: '1px solid var(--line-color)' }}
            >
              {/* Garment row */}
              <div
                data-cursor="EXPAND"
                onClick={() => setExpandedId(isExpanded ? null : garment.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setExpandedId(isExpanded ? null : garment.id)}
                aria-expanded={isExpanded}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2rem minmax(0, 1fr) auto auto',
                  alignItems: 'baseline',
                  gap: '1.25rem',
                  padding: '1.1rem 0',
                  cursor: 'pointer',
                }}
              >
                {/* Index */}
                <span className="type-mono-xs" style={{ color: 'var(--color-archive-700)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Name */}
                <div>
                  <span
                    className="type-chapter"
                    style={{
                      fontSize: 'clamp(1rem, 2vw, 1.6rem)',
                      color: isExpanded ? 'var(--color-archive-white)' : 'var(--color-archive-200)',
                      transition: 'color 0.25s',
                    }}
                  >
                    {garment.name}
                  </span>
                </div>

                {/* Category */}
                <span
                  className="type-mono-xs hidden md:block"
                  style={{ color: 'var(--color-archive-600)' }}
                >
                  {garment.category}
                </span>

                {/* Toggle */}
                <span
                  className="type-mono-xs"
                  style={{
                    color: 'var(--color-archive-600)',
                    transform: isExpanded ? 'rotate(45deg)' : 'none',
                    transition: 'transform 0.3s',
                    display: 'inline-block',
                  }}
                >
                  +
                </span>
              </div>

              {/* Expanded dossier */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="expand-grid-2-1 pb-8 grid gap-6 md:gap-8">
                      {/* Left: statement + cultural function */}
                      <motion.div
                        className="space-y-4"
                        initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                      >
                        <p
                          className="type-statement"
                          style={{ fontStyle: 'italic', color: 'var(--color-archive-200)' }}
                        >
                          &ldquo;{garment.statement}&rdquo;
                        </p>
                        <p className="type-statement">{garment.culturalFunction}</p>

                        {/* Key moments mini-timeline */}
                        {garment.keyMoments.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="type-mono-xs mb-2" style={{ color: 'var(--color-archive-600)' }}>
                              KEY MOMENTS
                            </p>
                            {garment.keyMoments.slice(0, 3).map((moment, mi) => (
                              <div
                                key={mi}
                                className="flex gap-4"
                                style={{ borderTop: '1px solid var(--color-archive-900)', paddingTop: '0.5rem' }}
                              >
                                <span
                                  className="type-mono-xs"
                                  style={{ color: 'var(--color-archive-500)', flexShrink: 0, minWidth: '3.5rem' }}
                                >
                                  {moment.year}
                                </span>
                                <p className="type-statement" style={{ fontSize: '0.75rem' }}>
                                  {moment.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>

                      {/* Right: metadata */}
                      <motion.div
                        className="space-y-5"
                        initial={prefersReduced ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.18, duration: 0.35 }}
                      >
                        <div>
                          <p className="type-mono-xs mb-2" style={{ color: 'var(--color-archive-600)' }}>
                            VISUAL KEYWORDS
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {garment.visualKeywords.map((kw) => (
                              <span key={kw} className="keyword-tag">{kw}</span>
                            ))}
                          </div>
                        </div>

                        {garment.brands.length > 0 && (
                          <div>
                            <p className="type-mono-xs mb-2" style={{ color: 'var(--color-archive-600)' }}>
                              ASSOCIATED
                            </p>
                            <div className="space-y-1">
                              {garment.brands.slice(0, 5).map((brand) => (
                                <p key={brand} className="type-mono-xs break-word" style={{ color: 'var(--color-archive-500)' }}>
                                  {brand}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <p className="type-mono-xs mb-1" style={{ color: 'var(--color-archive-600)' }}>
                            GARMENT ID
                          </p>
                          <p className="type-mono-xs break-word" style={{ color: 'var(--color-archive-700)' }}>
                            {garment.id}
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

        <div style={{ borderTop: '1px solid var(--line-color)' }} />
      </div>
    </section>
  )
}
