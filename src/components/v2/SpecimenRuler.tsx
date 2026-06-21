// 校準刻度列——inspection ruler，用在 EraLabSection / MaterialBoard 頂部，
// 是「材料系統」的非文字視覺載體之一：純 CSS tick + 數字標籤，不靠圖片。
interface SpecimenRulerProps {
  ticks?: number
  unit?: string
  className?: string
}

export function SpecimenRuler({ ticks = 10, unit = 'MM', className }: SpecimenRulerProps) {
  return (
    <div className={`relative ${className ?? ''}`} aria-hidden="true">
      <div className="lab-ruler">
        {Array.from({ length: ticks }).map((_, i) => (
          <div key={i} className={`lab-ruler-tick ${i % 5 === 0 ? 'lab-ruler-tick-major' : ''}`} />
        ))}
      </div>
      <div className="mt-0.5 flex justify-between">
        {Array.from({ length: Math.ceil(ticks / 5) + 1 }).map((_, i) => (
          <span key={i} className="type-mono-xs" style={{ color: 'var(--color-archive-700)', fontSize: '0.5rem' }}>
            {String(i * 5).padStart(2, '0')}
          </span>
        ))}
      </div>
      <span
        className="type-mono-xs absolute right-0 -top-3"
        style={{ color: 'var(--color-archive-700)', fontSize: '0.5rem' }}
      >
        {unit}
      </span>
    </div>
  )
}
