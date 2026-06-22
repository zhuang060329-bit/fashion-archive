'use client'

// InspectableObject — 取代舊的 specimen flip card / accordion。
// 一個可被 ArchiveLens 掃描、點擊揭露的「文化物件」，不是資料卡。
//
// 互動：
//   - data-lens="inspect" → cursor 在它上面變 scan 並 morph 到它的邊界
//   - hover：accent 邊 + 材料層浮現（CSS，:hover）
//   - click / Enter：揭露 material readout（statement + context + 來源分類），
//     以位移 + accent annotation 線「拉開」，不是 tooltip 淡入
//   - 一個場景一次只開一個（由父層 active 控制）
//
// skin：六種年代物件皮膚（pin / plate / margin / crop / signal / swatch），
// 各自不同框體與材料處理，避免六個年代共用同一張卡。
//
// 來源：把 case type 轉成 broad source category（RUNWAY / BRAND ARCHIVE…），
// 取代「verified」自證；同時顯示資料裡真實存在的 source 字串，不偽造。

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export type InspectSkin = 'pin' | 'plate' | 'margin' | 'crop' | 'signal' | 'swatch'

export interface InspectItem {
  id: string
  index: string // 顯示用編號（年份或編碼）
  title: string
  year: string | number
  statement: string
  context: string
  keywords: string[]
  sourceCategory: string
  source?: string
  material?: string
}

interface Props {
  item: InspectItem
  skin: InspectSkin
  accent: string
  active: boolean
  onToggle: () => void
  className?: string
  style?: React.CSSProperties
}

export function InspectableObject({ item, skin, accent, active, onToggle, className, style }: Props) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  // 鍵盤揭露後把焦點留在物件上（揭露面板在同一節點內，不跳焦）
  const kbRef = useRef(false)
  useEffect(() => {
    if (active && kbRef.current) {
      kbRef.current = false
      ref.current?.focus()
    }
  }, [active])

  // 磁吸手感：板塊朝游標傾斜 + 微位移（pull）。lens 框體吸附 + 板塊回應
  // 兩者疊加，才有「被儀器吸住」的絲滑感，而不是游標單方面跳過去。
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5 // -0.5..0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--tilt-x', `${(-py * 7).toFixed(2)}deg`)
    el.style.setProperty('--tilt-y', `${(px * 7).toFixed(2)}deg`)
    el.style.setProperty('--pull-x', `${(px * 10).toFixed(2)}px`)
    el.style.setProperty('--pull-y', `${(py * 10).toFixed(2)}px`)
    el.style.setProperty('--spot-x', `${(px + 0.5) * 100}%`)
    el.style.setProperty('--spot-y', `${(py + 0.5) * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
    el.style.setProperty('--pull-x', '0px')
    el.style.setProperty('--pull-y', '0px')
  }

  return (
    <div
      ref={ref}
      className={`inspect-obj inspect-${skin} ${active ? 'is-open' : ''} ${className ?? ''}`}
      style={{ '--obj-accent': accent, ...style } as React.CSSProperties}
      data-obj-id={item.id}
      data-lens="inspect"
      data-lens-label={`${item.index} · ${String(item.title).slice(0, 22).toUpperCase()}`}
      role="button"
      tabIndex={0}
      aria-expanded={active}
      aria-label={`${item.title}, ${active ? 'showing detail' : 'inspect'}`}
      onClick={onToggle}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          kbRef.current = true
          onToggle()
        }
      }}
    >
      {/* 材料 / 框體裝飾層（skin 各異，純 CSS/SVG） */}
      <span className="inspect-material" aria-hidden="true" />

      {/* 拆片：開啟時三塊「紙樣裁片」往外散開，garment exploded view */}
      <span className="inspect-pattern" aria-hidden="true">
        <span className="pattern-piece pattern-piece-1" />
        <span className="pattern-piece pattern-piece-2" />
        <span className="pattern-piece pattern-piece-3" />
      </span>

      {/* FRONT */}
      <div className="inspect-front">
        <div className="inspect-front-head">
          <span className="type-mono-xs inspect-index">{item.index}</span>
          <span className="type-mono-xs" style={{ color: accent }}>
            {item.year}
          </span>
        </div>

        <p className="inspect-title">{item.title}</p>

        <div className="inspect-keywords">
          {item.keywords.slice(0, 3).map((k) => (
            <span key={k} className="inspect-kw">
              {k}
            </span>
          ))}
        </div>

        <span className="inspect-cue type-mono-xs" aria-hidden="true">
          {active ? '— CLOSE' : 'INSPECT +'}
        </span>
      </div>

      {/* REVEAL — material readout，位移拉開，不是 tooltip */}
      <div className="inspect-readout" aria-hidden={!active}>
        <span className="inspect-readout-rule" aria-hidden="true" />
        <p className="inspect-statement">&ldquo;{item.statement}&rdquo;</p>
        <p className="type-note inspect-context">{item.context}</p>
        <div className="inspect-source">
          <span className="inspect-source-cat" style={{ borderColor: accent, color: accent }}>
            {item.sourceCategory}
          </span>
          {item.source && <span className="type-mono-xs inspect-source-text">{item.source}</span>}
        </div>
      </div>

      {prefersReduced ? null : <span className="inspect-scanline" aria-hidden="true" />}
    </div>
  )
}
