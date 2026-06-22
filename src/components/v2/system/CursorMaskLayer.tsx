'use client'

// CursorMaskLayer — 鼠標跟隨蒙版。整層只在 lens 周圍的圓形遮罩內顯現，
// 揭露一層與正常表面不同的「藍圖 / x-ray」材料層（技術格線 + era accent），
// 呼應「檢視儀器」的概念：游標所到之處看見表面底下的構造。
//
// 遮罩位置純讀 InteractiveSurface 寫的 --lens-x/--lens-y（CSS mask，無 JS/rAF）。
// 這一層也是未來放「背景影片」的插槽：把 .cursor-mask-content 換成 <video>
// 即可變成「游標揭露影片」的效果，機制完全沿用。
//
// 降級：reduced-motion / coarse pointer → 不顯示（沒有自訂游標時無意義）。

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsCoarsePointer } from '@/hooks/useDesktopViewport'

export function CursorMaskLayer() {
  const prefersReduced = useReducedMotion()
  const isCoarse = useIsCoarsePointer()
  if (prefersReduced || isCoarse) return null

  return (
    <div className="cursor-mask" aria-hidden="true">
      {/* 未來影片插槽：把下面整塊換成 <video muted loop playsInline> 即可 */}
      <div className="cursor-mask-content">
        <div className="cursor-mask-grid" />
        <div className="cursor-mask-wash" />
      </div>
    </div>
  )
}
