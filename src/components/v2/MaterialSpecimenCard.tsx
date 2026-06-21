'use client'

import { useRef, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// 手動移植的 spotlight + tilt 手法（技術參考 React Bits 公開的
// SpotlightCard / TiltedCard pattern：mousemove 算游標相對位置 →
// CSS variable 驅動 radial-gradient spotlight + perspective tilt）。
// 這不是 CLI 安裝的 React Bits 元件——CLI 安裝在這個環境被
// permission classifier 擋下（視為從第三方 registry 引入未經明確
// 指定的程式碼），改為依公開技術手法手寫，視覺與互動邏輯仍對應
// React Bits 的命名 pattern，但顏色/排版/材質完全是本專案 token。
//
// 用於 EraLabSection 的 case fragment 與 MaterialBoard 的 garment card。
interface MaterialSpecimenCardProps {
  specimenLabel: string // 給 ScannerCursor 讀的 data-specimen-label
  accentColor?: string
  className?: string
  children: ReactNode
  onClick?: () => void
  expanded?: boolean
  role?: string
  ariaLabel?: string
  decorate?: boolean // 預設 true：加 punch hole + edge ticks，象徵「已歸檔標本」
}

const MAX_TILT_DEG = 5

export function MaterialSpecimenCard({
  specimenLabel,
  accentColor,
  className,
  children,
  onClick,
  expanded,
  role,
  ariaLabel,
  decorate = true,
}: MaterialSpecimenCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width // 0..1
    const py = (e.clientY - rect.top) / rect.height // 0..1

    card.style.setProperty('--spot-x', `${px * 100}%`)
    card.style.setProperty('--spot-y', `${py * 100}%`)
    // tilt：中心為 0，邊緣為 ±MAX_TILT_DEG。Y 軸滑鼠位置控制 rotateX，反向；
    // X 軸滑鼠位置控制 rotateY
    card.style.setProperty('--tilt-x', `${(0.5 - py) * MAX_TILT_DEG * 2}deg`)
    card.style.setProperty('--tilt-y', `${(px - 0.5) * MAX_TILT_DEG * 2}deg`)
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div
      ref={cardRef}
      data-specimen="true"
      data-specimen-label={specimenLabel}
      className={`specimen-card ${className ?? ''}`}
      style={{ '--specimen-accent': accentColor } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      aria-expanded={onClick ? expanded : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      {decorate && <span className="specimen-punch-hole" aria-hidden="true" />}
      {children}
      {decorate && <span className="specimen-edge-ticks" aria-hidden="true" />}
    </div>
  )
}
