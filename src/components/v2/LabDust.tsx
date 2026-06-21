'use client'

// 材質語義的粒子——不是滿版星空/bokeh，是「掃描光束掃過時揚起的纖維灰塵」。
// 只渲染在一個水平帶狀區域內（由呼叫端用 wrapper 定位/裁切），數量很少，
// 預設不可見（opacity 0），由 EntryLab 的 GSAP timeline 在 beam 經過時
// 才觸發短暫淡入淡出。reduced-motion 時整個元件不渲染（見 globals.css
// .lab-dust 的 display:none，雙重保險）。
interface LabDustProps {
  count?: number
  className?: string
}

export function LabDust({ count = 14, className }: LabDustProps) {
  const particles = Array.from({ length: count }).map((_, i) => {
    // deterministic pseudo-random：用 index 算位置，避免 hydration mismatch
    const seed = (i * 137.5) % 100
    const top = (seed * 3.7) % 100
    const left = (i * 53) % 100
    const isFiber = i % 3 === 0
    const size = isFiber ? undefined : 1 + (i % 3)
    return { top, left, isFiber, size, key: i }
  })

  return (
    <div className={`lab-dust-field pointer-events-none absolute inset-0 ${className ?? ''}`} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.key}
          className={`lab-dust ${p.isFiber ? 'lab-dust-fiber' : ''}`}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  )
}
