'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { garments } from '@/data/garments'
import { MaterialSpecimenCard } from '@/components/v2/MaterialSpecimenCard'
import { SpecimenRuler } from '@/components/v2/SpecimenRuler'
import { SpecimenStamp } from '@/components/v2/SpecimenStamp'
import { GarmentSilhouette } from '@/components/v2/GarmentSilhouette'
import { getGarmentSpecimenState } from '@/lib/specimenState'
import type { Garment } from '@/data/types'

// v2 取代 GarmentIndex 的 accordion list。卡片放在一塊 inspection table
// plane 上（.material-tray-plane——帶邊框與台面漸層的容器，不是散落卡片
// 牆），featured 標本（每 4 件取 1 件）有明確理由標籤「PRIORITY SPECIMEN」，
// 不是隨機放大。一次只允許一張卡 peel 開（activeId 由本元件管理），
// 展開時其他卡退後（.has-active-specimen，見 globals.css），避免兩張
// 展開卡互相蓋住文字。
const ROTATIONS = [-0.9, 0.7, -0.5, 1.1, -1.3, 0.6, -0.8, 1.0, -0.6, 0.9]
const OFFSETS = [0, 14, 6, 22, 2, 18, 8, 0, 16, 4]

export function MaterialBoard() {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)

  useGSAP(
    () => {
      if (prefersReduced) return
      gsap.from('.material-board-card', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        stagger: { each: 0.07, grid: 'auto', from: 'start' },
        scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
      })
    },
    { scope: containerRef, dependencies: [prefersReduced] },
  )

  return (
    <section
      ref={containerRef}
      className="relative px-6 py-20 md:px-10 md:py-28"
      style={{ borderTop: '1px solid var(--line-color)' }}
      aria-label="Material board — garment specimens"
    >
      <div className="lab-cutting-guide" aria-hidden="true" />

      <div className="relative z-10">
        <div className="mb-4 flex items-baseline gap-6">
          <p className="lab-meta-tertiary type-mono-xs">——MATERIAL BOARD——</p>
          <p className="lab-meta-tertiary type-mono-xs">{garments.length} SPECIMENS LOGGED</p>
        </div>

        <SpecimenRuler ticks={20} className="mb-16 max-w-md" />

        {/* inspection table plane — 卡片的容器邏輯來源，不是散落卡片牆 */}
        <div className={`material-tray-plane ${activeId ? 'has-active-specimen' : ''}`}>
          <div className="material-tray-rail" aria-hidden="true" />
          <div
            className="grid gap-x-4 gap-y-10"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
          >
            {garments.map((g, i) => {
              const featured = i % 4 === 0
              return (
                <div
                  key={g.id}
                  style={{
                    transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)`,
                    marginTop: `${OFFSETS[i % OFFSETS.length]}px`,
                  }}
                >
                  <GarmentSpecimen
                    garment={g}
                    featured={featured}
                    isActive={activeId === g.id}
                    onActivate={() => setActiveId(g.id)}
                    onDeactivate={() => setActiveId(null)}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function GarmentSpecimen({
  garment,
  featured,
  isActive,
  onActivate,
  onDeactivate,
}: {
  garment: Garment
  featured: boolean
  isActive: boolean
  onActivate: () => void
  onDeactivate: () => void
}) {
  const specimenState = getGarmentSpecimenState(garment.category)
  const primarySource = garment.sourceNotes[0]
  const minHeight = featured ? '17rem' : '12.5rem'

  return (
    <MaterialSpecimenCard
      specimenLabel={`${garment.id} — ${garment.name}`}
      role="button"
      ariaLabel={`${garment.name}, ${isActive ? 'showing detail' : 'showing summary'}`}
      expanded={isActive}
      onClick={isActive ? onDeactivate : onActivate}
      className={`material-board-card ${isActive ? 'is-active-specimen' : ''}`}
    >
      <div style={{ minHeight, padding: '1rem', position: 'relative' }}>
        <GarmentSilhouette category={garment.category} color="var(--color-archive-400)" />

        <div className="relative flex items-start justify-between">
          <span className="lab-meta-secondary type-mono-xs">ACC. {garment.id}</span>
          <span className="lab-meta-secondary type-mono-xs">{garment.category.toUpperCase()}</span>
        </div>

        {featured && (
          <span className="specimen-tray-priority-tag relative mt-2 inline-block">
            PRIORITY SPECIMEN
          </span>
        )}

        <p
          className="lab-meta-primary type-chapter relative mt-3"
          style={{ fontSize: featured ? 'clamp(1.2rem, 2vw, 1.7rem)' : 'clamp(1rem, 1.6vw, 1.4rem)' }}
        >
          {garment.name}
        </p>

        <p className="lab-meta-secondary type-mono-xs relative mt-2">
          STATE: {specimenState}
        </p>

        {/* MEMBRANE LIFT — 揭開層位移 + 陰影，模擬掀起標本透明片，
            不是平面 clip-path 切換內容 */}
        <div
          className="material-membrane"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--color-archive-800)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '0.6rem',
            clipPath: isActive ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
            transform: isActive ? 'translateY(0)' : 'translateY(6px)',
            transition: 'clip-path var(--duration-card-reveal) var(--ease-archive), transform var(--duration-card-reveal) var(--ease-archive)',
            pointerEvents: isActive ? 'auto' : 'none',
          }}
        >
          {primarySource && (
            <div className="mb-1">
              <SpecimenStamp confidence={primarySource.confidence} />
            </div>
          )}
          <p className="type-statement lab-meta-primary" style={{ fontStyle: 'italic', fontSize: '0.76rem' }}>
            &ldquo;{garment.statement}&rdquo;
          </p>
          <p className="type-statement lab-meta-primary" style={{ fontSize: '0.72rem' }}>
            {garment.culturalFunction}
          </p>
          {garment.keyMoments[0] && (
            <p className="lab-meta-secondary type-mono-xs">
              {garment.keyMoments[0].year} — {garment.keyMoments[0].description}
            </p>
          )}
        </div>

        <p
          className="lab-meta-tertiary type-mono-xs absolute bottom-3 left-4"
          style={{ opacity: isActive ? 0 : 1, transition: 'opacity 0.2s' }}
        >
          CLICK TO PEEL
        </p>
      </div>
    </MaterialSpecimenCard>
  )
}
