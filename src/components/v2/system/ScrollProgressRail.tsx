'use client'

// ScrollProgressRail — 右側固定的捲動進度軌。進度填充純讀 InteractiveSurface
// 寫的 --scroll-progress（CSS scaleY，無額外 JS/rAF），六個年代節點依
// <html data-era> 高亮目前場景。desktop-only chrome，coarse pointer 隱藏。

import { ERA_MECHANISMS } from '@/data/thesis'

export function ScrollProgressRail() {
  return (
    <div className="scroll-rail" aria-hidden="true">
      <div className="scroll-rail-track">
        <div className="scroll-rail-fill" />
      </div>
      <div className="scroll-rail-eras">
        {ERA_MECHANISMS.map((m) => (
          <span key={m.id} className={`scroll-rail-era scroll-rail-era-${m.id}`}>
            <span className="scroll-rail-dot" />
            <span className="scroll-rail-label">{m.period}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
