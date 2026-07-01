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
import { InspectionPanel } from '@/components/v2/InspectionPanel'
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

// 每個年代一種「材料環境」語法——hover 材料樣本時，整個 section 的背景
// texture / accent / light 切換成該年代的材料手感（撕裂紙邊 / 柔霧厚重 /
// 網版錯位 / 霧面柔光…）。這是「material sample drives environment」signature。
const ERA_MATERIAL_ENV: Record<string, string> = {
  '1970s': 'torn',
  '1980s': 'padded',
  '1990s': 'raw',
  '2000s': 'flash',
  '2010s': 'print',
  '2020s': 'cashmere',
}

export function EraScene({ era }: { era: Era }) {
  const rootRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [panelSide, setPanelSide] = useState<'left' | 'right'>('right')
  const [matActive, setMatActive] = useState(false)
  const mechanism = getMechanism(era.id)
  const skin = ERA_SKIN[era.id] ?? 'plate'
  const matEnv = ERA_MATERIAL_ENV[era.id] ?? 'raw'

  const cases = getCasesByEra(era.id).map(caseToItem)
  const garments = getGarmentsByEra(era.id).map(garmentToItem)
  const items = [...cases, ...garments]
  const activeItem = items.find((it) => it.id === activeId) ?? null

  const toggle = (id: string) => setActiveId((cur) => (cur === id ? null : id))

  // 判讀單 dock 在被檢視物件的「反側」，永遠不遮住正在看的物件。
  useEffect(() => {
    if (!activeId) return
    const el = rootRef.current?.querySelector<HTMLElement>(`[data-obj-id="${activeId}"]`)
    if (!el) return
    const r = el.getBoundingClientRect()
    setPanelSide(r.left + r.width / 2 > window.innerWidth * 0.5 ? 'left' : 'right')
  }, [activeId])

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

      // 標頭副層通用進場（機制大標另有各年代專屬轉場，見下）
      gsap.from('.era-head-period, .era-head-thesis, .era-head-meta', {
        opacity: 0,
        y: 16,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 72%' },
      })

      // ── 年代轉場 signature：進入每個年代時，巨型機制大標各有不同的「顯影方式」，
      //    不是統一 fade——撕開 / 肩線擴張 / 擦除 / 曝光閃光 / feed glitch / 沉入材質。
      const head = { scrollTrigger: { trigger: '.era-head', start: 'top 76%' } }
      const mech = '.era-head-mechanism'
      switch (era.id) {
        case '1970s': // torn — 沿撕裂線由左向右揭露 + 斜切抖動
          gsap.from(mech, {
            clipPath: 'inset(0 100% 0 0)', skewX: 7, x: -26, duration: 0.85,
            ease: 'power4.out', ...head,
          })
          break
        case '1980s': // structure — 從左緣沿肩線橫向擴張（字距收緊→展開）
          gsap.from(mech, {
            scaleX: 0.68, opacity: 0, letterSpacing: '-0.14em', transformOrigin: 'left center',
            duration: 1.0, ease: 'power3.out', ...head,
          })
          break
        case '1990s': // refusal — 極慢自留白中浮現，字距先開後收（被擦除的反向）
          gsap.from(mech, {
            opacity: 0, letterSpacing: '0.3em', filter: 'blur(3px)', duration: 1.7,
            ease: 'power2.out', ...head,
          })
          break
        case '2000s': // image — 過曝閃光：blur + brightness 爆亮後收回（flash 曝光）
          gsap.fromTo(mech,
            { opacity: 0, filter: 'blur(16px) brightness(3.2)' },
            { opacity: 1, filter: 'blur(0px) brightness(1)', duration: 0.6, ease: 'power2.out', ...head },
          )
          break
        case '2010s': // signal — feed glitch：快速 x/skew 抖動 + 透明度閃爍後定位
          gsap.from(mech, {
            keyframes: [
              { x: -10, skewX: 9, opacity: 0.15, duration: 0.08 },
              { x: 7, skewX: -6, opacity: 0.85, duration: 0.08 },
              { x: -3, skewX: 3, opacity: 0.6, duration: 0.08 },
              { x: 0, skewX: 0, opacity: 1, duration: 0.14 },
            ],
            ease: 'none', ...head,
          })
          break
        case '2020s': // silence — 沉入材質：自微放大 + blur 緩緩沉降定住
          gsap.from(mech, {
            scale: 1.08, opacity: 0, filter: 'blur(7px)', transformOrigin: 'center',
            duration: 1.6, ease: 'power2.out', ...head,
          })
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
      data-mat-env={matEnv}
      data-mat-active={matActive ? 'true' : 'false'}
      aria-label={`${era.period} — ${mechanism?.mechanism}`}
    >
      {/* 材料環境層——hover 材料樣本時切換成該年代的材料手感（撕裂 / 厚霧 /
          網版 / 柔光…），改變整個 section 的 texture 與光，不是只亮一格 swatch */}
      <div className="era-mat-env" aria-hidden="true" />

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

      {/* 關聯網——展開某物件時，從它拉線到「最近的」幾個同年代物件，
          線走在物件之下、避開標題，只在縫隙顯現，不成背景噪音 */}
      <ConnectorOverlay containerRef={rootRef} activeId={activeId} />

      {/* 材料鋪面——每個年代不同形態（pinned / strips / tags / slab…），
          hover 樣本驅動整個 section 的材料環境，label 可讀不只是裝飾 */}
      <EraMaterialStrip
        eraId={era.id}
        keywords={era.visualKeywords}
        material={mechanism?.material}
        onHover={(on) => setMatActive(on)}
      />

      {/* 判讀單——點擊物件後 docked 在物件反側，把長判讀從小卡片移出來 */}
      <InspectionPanel item={activeItem} accent="var(--era-accent)" side={panelSide} onClose={() => setActiveId(null)} />
    </section>
  )
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
  // 只連最近的 3 個——避免一展開就是一張覆蓋全 section 的蜘蛛網
  const nearest = [...geo.others]
    .sort((p, q) => Math.hypot(p.x - a.x, p.y - a.y) - Math.hypot(q.x - a.x, q.y - a.y))
    .slice(0, 3)
  return (
    <svg
      className="connector-overlay"
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {nearest.map((o) => {
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

/* 材料樣本鋪面：每個年代不同形態（pinned / strips / tags / chips / slab），
   hover 任一樣本 → onHover(true) 讓 EraScene 切換整個 section 的材料環境。
   label 用可讀字級，不再是裝飾噪點。 */
const MATERIAL_FORM: Record<string, string> = {
  '1970s': 'pinned', // 撕邊紙片 + 圖釘
  '1980s': 'slab',   // 厚實大塊材料板
  '1990s': 'strips', // 垂直布條
  '2000s': 'tags',   // tabloid 標籤 / 票根
  '2010s': 'labels', // 物流標籤 / receipt
  '2020s': 'chips',  // 堆疊材料碼片
}

function EraMaterialStrip({
  eraId,
  keywords,
  material,
  onHover,
}: {
  eraId: string
  keywords: string[]
  material?: string
  onHover: (on: boolean) => void
}) {
  const form = MATERIAL_FORM[eraId] ?? 'pinned'
  // 把該年代的標誌材料放第一個，其餘用 keywords 補滿
  const labels = [material, ...keywords.filter((k) => k !== material)].filter(Boolean).slice(0, 6) as string[]

  return (
    <div className="era-material-strip">
      <div className="era-material-head">
        <span className="era-material-strip-label type-mono-sm">MATERIAL SAMPLES</span>
        <span className="type-mono-xs era-material-hint">HOVER TO READ THE SURFACE</span>
      </div>
      <div
        className={`era-material-set era-material-${form}`}
        onPointerLeave={() => onHover(false)}
      >
        {labels.map((kw, i) => (
          <button
            key={kw}
            type="button"
            className={`mat-sample mat-sample-${i % 4}`}
            data-lens="inspect"
            data-lens-label={`MATERIAL · ${kw.toUpperCase()}`}
            onPointerEnter={() => onHover(true)}
            onFocus={() => onHover(true)}
            onBlur={() => onHover(false)}
          >
            <span className="mat-sample-weave" aria-hidden="true" />
            <span className="mat-sample-index type-mono-xs" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="mat-sample-label">{kw}</span>
          </button>
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
