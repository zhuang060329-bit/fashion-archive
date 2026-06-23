'use client'

// EntryScene — 進站 hero / boot sequence，取代舊的 EntryLab（假儀表板）。
// 強記憶點：巨型 kinetic 標題以 mask + 逐行上滑顯影，thesis 在標題下方
// 以具體主張呈現（不是格言、不是 telemetry），底部是六年代索引條——
// 每格是一種「服裝承載身分的機制」，cursor 可掃描、點擊跳到該年代場景。
//
// scroll-linked：標題第二行隨捲動水平漂移（kinetic type 與 scroll 綁定）。

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SITE_THESIS, ERA_MECHANISMS } from '@/data/thesis'

export function EntryScene() {
  const rootRef = useRef<HTMLElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const beamRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) {
        gsap.set(['.kinetic-line > span', '.entry-fade', '.era-index-cell'], {
          y: 0,
          opacity: 1,
          clearProps: 'all',
        })
        return
      }

      // boot sequence：background wake（背景由暗緩亮）+ title chromatic resolve
      // （殘影由散到聚）+ decade nav unlock（索引條由鎖定灰到可點）。
      const root = document.documentElement
      root.classList.add('boot-running')
      gsap.set(root, { '--boot-chroma': 1 })

      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => root.classList.remove('boot-running'),
      })

      // chromatic resolve：紅/青殘影偏移量由 1 收斂到 0（與標題顯影同步）
      tl.to(root, { '--boot-chroma': 0, duration: 1.2, ease: 'power2.out' }, 0.25)
      // nav unlock：boot 尾段解除索引條鎖定（CSS 過渡到可點亮度）
      tl.add(() => root.classList.remove('boot-running'), 1.7)

      // 0. 進站 scan beam 由上往下掃過一次
      if (beamRef.current) {
        tl.fromTo(beamRef.current,
          { top: '-4%', opacity: 0 },
          { top: '0%', opacity: 1, duration: 0.12 }, 0)
          .to(beamRef.current, { top: '104%', duration: 0.95, ease: 'power1.inOut' }, 0.12)
          .to(beamRef.current, { opacity: 0, duration: 0.2 }, 0.95)
      }

      // 1. 巨型標題逐行上滑（mask：父層 overflow hidden）
      tl.from('.kinetic-line > span', {
        yPercent: 118,
        duration: 1.15,
        stagger: 0.12,
      }, 0.15)

      // 2. 頂部 meta + thesis blur/fade 進場
      tl.from('.entry-fade', {
        opacity: 0,
        y: 16,
        filter: 'blur(8px)',
        duration: 0.9,
        stagger: 0.12,
      }, 0.7)

      // 3. 年代索引條逐格升起
      tl.from('.era-index-cell', {
        opacity: 0,
        y: 22,
        duration: 0.6,
        stagger: 0.07,
      }, 1.0)

      // scroll-linked：第二行隨捲動往左漂移（kinetic type × scroll）
      if (line2Ref.current) {
        gsap.to(line2Ref.current, {
          xPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // 卸載安全：boot 中途卸載也要清掉 root class
      return () => document.documentElement.classList.remove('boot-running')
    },
    { scope: rootRef, dependencies: [prefersReduced] },
  )

  const scrollToEra = (id: string) => {
    const el = document.getElementById(`era-${id}`)
    if (el) el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' })
  }

  return (
    <section ref={rootRef} className="entry-scene" aria-label="Fashion Archive — entry">
      {/* ambient：boot scan beam + 角標 + 大範圍 ghost 標記，填滿首屏 */}
      <div className="entry-ambient" aria-hidden="true">
        <div ref={beamRef} className="entry-beam" />
        <span className="entry-ghost">1970 / 2020s</span>
        <div className="entry-corner entry-corner-tl" />
        <div className="entry-corner entry-corner-tr" />
        <div className="entry-corner entry-corner-bl" />
        <div className="entry-corner entry-corner-br" />
      </div>

      <div className="entry-meta-row entry-fade">
        <span className="type-mono-xs">FASHION ARCHIVE — POST-1970</span>
        <span className="type-mono-xs" style={{ color: 'var(--color-archive-500)' }}>
          AN INSPECTION SURFACE · SCAN / DRAG / READ
        </span>
      </div>

      <div style={{ margin: 'clamp(2rem, 5vw, 4rem) 0' }}>
        <h1 className="kinetic-title">
          <span className="kinetic-line">
            <span className="kinetic-glyph" data-text="FASHION">FASHION</span>
          </span>
          <span className="kinetic-line kinetic-line-2">
            <span ref={line2Ref} className="kinetic-glyph" data-text="ARCHIVE">ARCHIVE</span>
          </span>
        </h1>
      </div>

      <div className="entry-fade" style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
        <p className="entry-thesis">
          Clothing does not follow trends. It keeps finding new ways to carry{' '}
          <span className="thesis-key">who you are</span>.
        </p>
        <p
          className="type-statement"
          style={{ maxWidth: '40rem', marginTop: '1.1rem' }}
        >
          {SITE_THESIS.body}
        </p>
      </div>

      {/* 六年代索引條 —— 每格一種機制，cursor 掃描 + 點擊跳轉 */}
      <nav className="era-index-rail entry-fade" aria-label="Eras">
        {ERA_MECHANISMS.map((m) => (
          <button
            key={m.id}
            type="button"
            className="era-index-cell"
            data-lens="inspect"
            data-lens-label={`${m.period} · ${m.mechanism.toUpperCase()}`}
            onClick={() => scrollToEra(m.id)}
          >
            <span>{m.period}</span>
            <span className="era-index-mech">{m.mechanism}</span>
          </button>
        ))}
      </nav>
    </section>
  )
}
