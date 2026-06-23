'use client'

// EraScene — 一個年代 = 一個獨立場景。六個年代共用「標頭 shell」（mechanism
// kicker + era 標題 + thesis + 材料詞），但 body 用六種完全不同的版型語法 +
// 各自的 motion grammar，不是同一套卡片換資料。
//
//   1970s allegiance  — 撕邊 pin-board 拼貼（不對稱、旋轉、套印錯位）
//   1980s structure   — power columns（剛性直欄、gloss flash、overshoot 升起）
//   1990s refusal     — 大留白單欄 margin notes（慢長 fade）
//   2000s image       — tabloid 重疊裁切（旋轉錯位、flash-in）
//   2010s signal      — feed stack（訊號條、ticker、快速側滑）
//   2020s silence     — 材料近攝（大留白、低對比、極慢 scale）
//
// 進入場景時把 <html data-era> 設成本年代，驅動反應式背景換色 / lens accent。

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getCasesByEra } from '@/data/cases'
import { getGarmentsByEra } from '@/data/garments'
import { getMechanism } from '@/data/thesis'
import { InspectableObject, type InspectItem, type InspectSkin } from '@/components/v2/InspectableObject'
import type { Era } from '@/data/types'
import type { Case, CaseType, Garment } from '@/data/types'

const SOURCE_CATEGORY: Record<CaseType, string> = {
  runway: 'RUNWAY',
  campaign: 'PRESS / CAMPAIGN',
  'icon-look': 'ICON LOOK',
  'brand-moment': 'BRAND ARCHIVE',
  'garment-debut': 'GARMENT DEBUT',
  'cultural-collision': 'DOCUMENTED MOMENT',
}

const ERA_SKIN: Record<string, InspectSkin> = {
  '1970s': 'pin',
  '1980s': 'plate',
  '1990s': 'margin',
  '2000s': 'crop',
  '2010s': 'signal',
  '2020s': 'swatch',
}

function caseToItem(c: Case): InspectItem {
  return {
    id: c.id,
    index: c.id.replace('CASE-', ''),
    title: c.title,
    year: c.year,
    statement: c.statement,
    context: c.context,
    keywords: c.visualKeywords,
    sourceCategory: SOURCE_CATEGORY[c.type],
    source: c.sourceNotes[0]?.source,
  }
}

function garmentToItem(g: Garment): InspectItem {
  return {
    id: g.id,
    index: g.id,
    title: g.name,
    year: g.keyMoments[0]?.year ?? '',
    statement: g.statement,
    context: g.culturalFunction,
    keywords: g.visualKeywords,
    sourceCategory: 'GARMENT OBJECT',
    source: g.sourceNotes[0]?.source,
    material: g.visualKeywords[0],
  }
}

export function EraScene({ era }: { era: Era }) {
  const rootRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)
  const mechanism = getMechanism(era.id)
  const skin = ERA_SKIN[era.id] ?? 'plate'

  const cases = getCasesByEra(era.id).map(caseToItem)
  const garments = getGarmentsByEra(era.id).map(garmentToItem)
  const items = [...cases, ...garments]

  const toggle = (id: string) => setActiveId((cur) => (cur === id ? null : id))

  useGSAP(
    () => {
      // 進場時設定 data-era（驅動背景/lens 換色）
      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 55%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) document.documentElement.dataset.era = era.id
        },
      })

      if (prefersReduced) return () => st.kill()

      // 巨型 ghost 數字隨捲動視差漂移（填滿留白且有動態）
      gsap.to('.era-ghost-num', {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
      })

      // 標頭通用進場
      gsap.from('.era-head-line', {
        opacity: 0,
        y: 18,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
      })

      // 各年代專屬「轉場 moment」：大標題以不同語法進場（signature C）
      const titleTrig = { trigger: rootRef.current, start: 'top 72%' }
      const title = '.era-head-mechanism'
      switch (era.id) {
        case '1970s': // 撕開 / 套印錯位：skew + 旋轉抖落
          gsap.from(title, { opacity: 0, yPercent: 14, rotateZ: -2.5, skewX: 9, transformOrigin: 'left top', duration: 0.85, ease: 'power4.out', scrollTrigger: titleTrig })
          break
        case '1990s': // 擦除到留白的反向：字距由極寬收斂、慢長 fade（refusal）
          gsap.from(title, { opacity: 0, letterSpacing: '0.5em', filter: 'blur(6px)', duration: 1.5, ease: 'power2.out', scrollTrigger: titleTrig })
          break
        case '2010s': { // feed signal glitch：進場時水平抖動 + 不透明閃爍
          const tl = gsap.timeline({ scrollTrigger: titleTrig })
          tl.from(title, { opacity: 0, duration: 0.18 })
            .fromTo(title, { x: -16 }, { x: 7, duration: 0.06 })
            .to(title, { x: -5, duration: 0.05 })
            .to(title, { x: 3, opacity: 0.7, duration: 0.05 })
            .to(title, { x: 0, opacity: 1, duration: 0.12, ease: 'power2.out' })
          break
        }
        case '2000s': // 過曝 flash：scale + 亮度一閃落定
          gsap.from(title, { opacity: 0, scale: 1.06, filter: 'brightness(2.2)', duration: 0.5, ease: 'power2.out', scrollTrigger: titleTrig })
          break
      }

      // 各年代專屬 motion grammar（物件層）
      const objs = '.era-obj'
      const common = { scrollTrigger: { trigger: '.era-body', start: 'top 78%' } }
      switch (era.id) {
        case '1970s': // 撕裂抖動進場，隨機序
          gsap.from(objs, { opacity: 0, y: 24, rotateZ: 3, duration: 0.5, stagger: { each: 0.08, from: 'random' }, ease: 'power1.out', ...common })
          break
        case '1980s': // 從底部 overshoot 升起（power）
          gsap.from(objs, { opacity: 0, yPercent: 30, duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)', ...common })
          break
        case '1990s': // 慢長 fade（refusal）
          gsap.from(objs, { opacity: 0, y: 30, duration: 1.4, stagger: 0.22, ease: 'power2.out', ...common })
          break
        case '2000s': // flash-in（快速 pop + 微 scale）
          gsap.from(objs, { opacity: 0, scale: 0.92, duration: 0.32, stagger: { each: 0.05, from: 'random' }, ease: 'power1.out', ...common })
          break
        case '2010s': // 從右側快速側滑（feed velocity）
          gsap.from(objs, { opacity: 0, x: 60, duration: 0.5, stagger: 0.07, ease: 'power3.out', ...common })
          break
        case '2020s': // 極慢 scale + fade（silence）
          gsap.from(objs, { opacity: 0, scale: 1.04, duration: 1.6, stagger: 0.3, ease: 'power2.out', ...common })
          break
      }

      return () => st.kill()
    },
    { scope: rootRef, dependencies: [era.id, prefersReduced] },
  )

  return (
    <section
      ref={rootRef}
      id={`era-${era.id}`}
      className={`era-scene-section era-grammar-${era.id}`}
      aria-label={`${era.period} — ${mechanism?.mechanism}`}
    >
      {/* ambient density 層——巨型 ghost 年代數字 + 側邊量測軌 + 直書機制詞，
          填滿留白，給每個年代場景空間重量，不是稀疏卡片牆 */}
      <div className="era-ambient" aria-hidden="true">
        <span className="era-ghost-num">{era.decade}</span>
        <div className="era-side-rail">
          <span className="era-side-mech">{mechanism?.mechanism}</span>
          <div className="era-side-ticks">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className={`era-side-tick ${i % 5 === 0 ? 'is-major' : ''}`} />
            ))}
          </div>
          <span className="era-side-index">{era.caseIndex}</span>
        </div>
        <div className="era-corner era-corner-tl" />
        <div className="era-corner era-corner-br" />
      </div>

      {/* material sample 驅動的環境層——hover 樣本時淡入放大織紋 + accent 光 */}
      <div className="era-material-env" aria-hidden="true" />

      {/* 標頭 shell */}
      <header className="era-head">
        <div className="era-head-line era-head-kicker">
          <span className="era-head-mechanism">{mechanism?.mechanism}</span>
          <span className="type-mono-xs era-head-period">{era.period} · {era.title}</span>
        </div>
        <p className="era-head-line era-head-thesis">{mechanism?.thesisLine}</p>
        <div className="era-head-line era-head-meta">
          <span className="type-mono-xs">MATERIAL · {mechanism?.material?.toUpperCase()}</span>
          <span className="type-mono-xs" style={{ color: 'var(--color-archive-500)' }}>
            {items.length} OBJECTS · SELECTED FRAGMENTS
          </span>
        </div>
      </header>

      {/* body — 六種版型語法 */}
      <EraBody eraId={era.id} items={items} skin={skin} activeId={activeId} onToggle={toggle} />

      {/* 關聯網——展開某物件時，從它拉線到同年代其他物件，組成檔案關聯網 */}
      <ConnectorOverlay containerRef={rootRef} activeId={activeId} />

      {/* 材料鋪面——把年代 visualKeywords 變成可掃描的織紋樣本，
          填滿底部空白且讓「材料」在畫面上實際存在。每個年代不同形態。 */}
      <EraMaterialStrip keywords={era.visualKeywords} skin={skin} />
    </section>
  )
}

/* 樣本 hover 時驅動 section 環境：放大織紋 + accent 光淡入該年代背景。
   純 DOM 操作（不觸發 React render），對齊 InspectableObject 的手感寫法。 */
const MAT_WEAVE: string[] = [
  'repeating-linear-gradient(45deg, rgba(240,237,230,0.05) 0 2px, transparent 2px 11px)',
  'repeating-linear-gradient(0deg, rgba(240,237,230,0.045) 0 2px, transparent 2px 9px), repeating-linear-gradient(90deg, rgba(240,237,230,0.045) 0 2px, transparent 2px 9px)',
  'radial-gradient(circle, rgba(240,237,230,0.07) 1px, transparent 1.4px)',
  'repeating-linear-gradient(-45deg, color-mix(in oklch, var(--era-accent) 16%, transparent) 0 2px, transparent 2px 13px)',
  'repeating-linear-gradient(90deg, rgba(240,237,230,0.06) 0 3px, transparent 3px 15px)',
]
function applyMatEnv(target: HTMLElement, idx: number, on: boolean) {
  const section = target.closest<HTMLElement>('.era-scene-section')
  if (!section) return
  if (!on) {
    section.removeAttribute('data-mat-active')
    return
  }
  const r = section.getBoundingClientRect()
  const sr = target.getBoundingClientRect()
  section.style.setProperty('--mat-weave', MAT_WEAVE[idx % MAT_WEAVE.length])
  section.style.setProperty('--mat-x', `${(((sr.left + sr.width / 2) - r.left) / r.width) * 100}%`)
  section.style.setProperty('--mat-y', `${(((sr.top + sr.height / 2) - r.top) / r.height) * 100}%`)
  section.setAttribute('data-mat-active', 'true')
}

/* 關聯網覆疊：展開物件時量測同 section 內所有物件中心，從 active 物件
   拉 SVG 連線到其餘物件 + 端點節點，建立「檔案關聯」的視覺密度。
   座標相對 section（overflow hidden、position relative），不隨捲動改變，
   只在 activeId / resize 時重新量測。 */
interface Pt { x: number; y: number; id: string }
function ConnectorOverlay({
  containerRef,
  activeId,
}: {
  containerRef: React.RefObject<HTMLElement | null>
  activeId: string | null
}) {
  const [geo, setGeo] = useState<{ w: number; h: number; active: Pt | null; others: Pt[] }>({
    w: 0,
    h: 0,
    active: null,
    others: [],
  })

  useEffect(() => {
    let cancelled = false
    const measure = () => {
      if (cancelled) return
      const cont = containerRef.current
      if (!cont || !activeId) {
        setGeo((g) => ({ ...g, active: null, others: [] }))
        return
      }
      const cr = cont.getBoundingClientRect()
      const objs = Array.from(cont.querySelectorAll<HTMLElement>('[data-obj-id]'))
      let active: Pt | null = null
      const others: Pt[] = []
      for (const o of objs) {
        const r = o.getBoundingClientRect()
        const pt: Pt = { x: r.left - cr.left + r.width / 2, y: r.top - cr.top + r.height / 2, id: o.dataset.objId! }
        if (o.dataset.objId === activeId) active = pt
        else others.push(pt)
      }
      setGeo({ w: cr.width, h: cr.height, active, others })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => {
      cancelled = true
      window.removeEventListener('resize', measure)
    }
  }, [activeId, containerRef])

  if (!geo.active || geo.w === 0) return null
  const a = geo.active
  return (
    <svg
      className="connector-overlay"
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {geo.others.map((o) => {
        const len = Math.hypot(o.x - a.x, o.y - a.y)
        return (
          <g key={o.id} className="connector-group">
            <line
              x1={a.x}
              y1={a.y}
              x2={o.x}
              y2={o.y}
              className="connector-line"
              style={{ strokeDasharray: len, strokeDashoffset: len }}
            />
            <circle cx={o.x} cy={o.y} r={2.5} className="connector-node" />
          </g>
        )
      })}
      <circle cx={a.x} cy={a.y} r={4} className="connector-node connector-node-active" />
    </svg>
  )
}

/* 材料樣本鋪面：每個 keyword 一塊生成織紋。每個年代不同形態（pin / signal /
   swatch / 預設 grid），hover 樣本驅動 section 環境材質光（signature B）。 */
function EraMaterialStrip({ keywords, skin }: { keywords: string[]; skin: InspectSkin }) {
  // 2010s receipt / 2020s slab 用較少、較大的樣本，其餘維持鋪面
  const count = skin === 'signal' ? 5 : skin === 'swatch' ? 4 : 8
  const swatches = keywords.slice(0, count)
  return (
    <div className={`era-material-strip era-material-strip--${skin}`}>
      <span className="era-material-strip-label type-mono-xs">MATERIAL SAMPLES</span>
      <div className="era-material-swatches">
        {swatches.map((kw, i) => (
          <div
            key={kw}
            className={`material-swatch material-swatch-${i % 5}`}
            data-lens="inspect"
            data-lens-label={`SWATCH · ${kw.toUpperCase()}`}
            onPointerEnter={(e) => applyMatEnv(e.currentTarget, i, true)}
            onPointerLeave={(e) => applyMatEnv(e.currentTarget, i, false)}
          >
            <span className="material-swatch-weave" aria-hidden="true" />
            <span className="material-swatch-label type-mono-xs">{kw}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 版型語法分派 ─────────────────────────────────────────────── */

interface BodyProps {
  eraId: string
  items: InspectItem[]
  skin: InspectSkin
  activeId: string | null
  onToggle: (id: string) => void
}

function EraBody({ eraId, items, skin, activeId, onToggle }: BodyProps) {
  const accent = 'var(--era-accent)'
  const obj = (it: InspectItem, style?: React.CSSProperties, cls?: string) => (
    <InspectableObject
      key={it.id}
      item={it}
      skin={skin}
      accent={accent}
      active={activeId === it.id}
      onToggle={() => onToggle(it.id)}
      className={`era-obj ${cls ?? ''}`}
      style={style}
    />
  )

  // 1970s — pin-board 拼貼：旋轉、高低錯落、不對稱
  if (eraId === '1970s') {
    const tilts = [-2.4, 1.8, -1.2, 2.2, -0.8, 1.4]
    const tops = [0, 36, 12, 48, 6, 30]
    return (
      <div className="era-body era-body-pinboard">
        {items.map((it, i) =>
          obj(it, { '--obj-rotate': `${tilts[i % tilts.length]}deg`, marginTop: `${tops[i % tops.length]}px` } as React.CSSProperties),
        )}
      </div>
    )
  }

  // 1980s — power columns：剛性等高直欄
  if (eraId === '1980s') {
    return <div className="era-body era-body-columns">{items.map((it) => obj(it))}</div>
  }

  // 1990s — 大留白單欄 margin notes
  if (eraId === '1990s') {
    return (
      <div className="era-body era-body-void">
        {items.map((it, i) => obj(it, { marginLeft: `${(i % 3) * 8}%`, maxWidth: '34rem' }))}
      </div>
    )
  }

  // 2000s — tabloid 重疊裁切
  if (eraId === '2000s') {
    const tilts = [-3, 2.5, -1.5, 3, -2]
    const offs = [0, -24, 18, -12, 24]
    return (
      <div className="era-body era-body-tabloid">
        {items.map((it, i) =>
          obj(it, { '--obj-rotate': `${tilts[i % tilts.length]}deg`, marginTop: `${offs[i % offs.length]}px`, zIndex: items.length - i } as React.CSSProperties, 'era-obj-crop'),
        )}
      </div>
    )
  }

  // 2010s — feed stack：訊號條 + ticker
  if (eraId === '2010s') {
    const ticker = items.map((it, i) => `SIGNAL ${String(i + 1).padStart(2, '0')} — ${it.title}`).join('     ·     ')
    return (
      <div className="era-body era-body-feed">
        <div className="feed-ticker" aria-hidden="true">
          <span className="feed-ticker-run">{ticker}&nbsp;&nbsp;·&nbsp;&nbsp;{ticker}</span>
        </div>
        <div className="feed-stack">{items.map((it) => obj(it))}</div>
      </div>
    )
  }

  // 2020s — 材料近攝：大留白、少量大物件
  return (
    <div className="era-body era-body-silence">{items.map((it) => obj(it))}</div>
  )
}
