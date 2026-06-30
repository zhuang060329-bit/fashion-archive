'use client'

// InspectionPanel — 點擊物件後展開的「檢測讀出層」，docked 在視窗右側。
// 不是 tooltip、不是 modal：它是一張「被儀器掃描後拉出來的判讀單」，
// 以 clip / scan reveal 展開，內容有層級（編號 → 標題 → 引言 → 判讀 → 來源），
// 並從左緣拉一條 leader line 指回正在被檢視的物件。
//
// 設計理由：原本長 context 擠在小卡片裡造成原生白色 scrollbar 與壓字。
// 把可讀內容移到這張有空間的判讀單，卡片只保留「標本被打開」的動作，
// 兩者分工——卡片是被檢視的物件，這裡是判讀結果。
//
// 內部若超高才滾動，且用自訂暗色 scrollbar（永遠不露白色原生條）。

import { useEffect, useRef } from 'react'
import type { InspectItem } from './InspectableObject'

interface Props {
  item: InspectItem | null
  accent: string
  onClose: () => void
}

export function InspectionPanel({ item, accent, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  // Esc 關閉；開啟時把焦點移入面板（鍵盤可達）
  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    ref.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [item, onClose])

  return (
    <div
      ref={ref}
      className={`inspection-panel ${item ? 'is-open' : ''}`}
      style={{ '--panel-accent': accent } as React.CSSProperties}
      role="dialog"
      aria-modal="false"
      aria-label={item ? `Inspection: ${item.title}` : 'Inspection panel'}
      aria-hidden={!item}
      tabIndex={-1}
    >
      {/* leader line — 從面板左緣指回被檢視物件方向 */}
      <span className="inspection-leader" aria-hidden="true" />

      <div className="inspection-plate">
        <span className="inspection-scan" aria-hidden="true" />

        <div className="inspection-head">
          <span className="type-mono-xs inspection-index">{item?.index}</span>
          <button
            type="button"
            className="inspection-close type-mono-xs"
            data-lens="inspect"
            data-lens-label="CLOSE READOUT"
            onClick={onClose}
            aria-label="Close inspection"
          >
            CLOSE ✕
          </button>
        </div>

        <div className="inspection-readout-bar">
          <span className="type-mono-xs" style={{ color: accent }}>
            {item?.sourceCategory}
          </span>
          <span className="type-mono-xs inspection-year">{item?.year}</span>
        </div>

        <p className="inspection-title">{item?.title}</p>

        {item?.statement && (
          <p className="inspection-statement">&ldquo;{item.statement}&rdquo;</p>
        )}

        <div className="inspection-scroll">
          <p className="type-note inspection-context">{item?.context}</p>
        </div>

        {item?.keywords?.length ? (
          <div className="inspection-kw-row" aria-hidden="true">
            {item.keywords.slice(0, 4).map((k) => (
              <span key={k} className="inspection-kw">
                {k}
              </span>
            ))}
          </div>
        ) : null}

        {item?.source && (
          <p className="type-mono-xs inspection-source">
            <span style={{ color: accent }}>SOURCE — </span>
            {item.source}
          </p>
        )}
      </div>
    </div>
  )
}
