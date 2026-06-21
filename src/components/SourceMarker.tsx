import type { Confidence } from '@/data/types'

// confidence 標籤顏色對應 — CaseFragment 與 CaseFragmentCompact 共用
const CONFIDENCE_COLOR: Record<Confidence, string> = {
  verified: 'var(--color-archive-400)',
  'widely-reported': 'var(--color-archive-500)',
  contested: 'var(--color-era-10)',
}

interface SourceMarkerProps {
  confidence: Confidence
  /** 來源名稱；compact 版不顯示，僅標示信心等級 */
  source?: string
  /** default: CaseFragment（含分隔線、來源文字）；compact: CaseFragmentCompact（僅信心等級） */
  size?: 'default' | 'compact'
}

export function SourceMarker({ confidence, source, size = 'default' }: SourceMarkerProps) {
  const color = CONFIDENCE_COLOR[confidence]
  const label = `SRC: ${confidence.toUpperCase().replace(/-/g, ' ')}`
  const dotSize = size === 'compact' ? 3 : 4

  return (
    <div
      style={
        size === 'default'
          ? {
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid var(--line-color)',
              marginTop: '0.25rem',
            }
          : { display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }
      }
    >
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
        }}
      />
      <span className="type-mono-xs" style={{ color }}>
        {label}
      </span>
      {size === 'default' && source && (
        // Phase 7A 對比修正：原本 archive-700 (#252320) 疊在卡背 archive-800
        // 上幾乎不可見（約 1.2:1）。提到 archive-400，來源出處變成可讀的
        // 次要資訊，而不是裝飾性灰字
        <span className="type-mono-xs break-word" style={{ color: 'var(--color-archive-400)' }}>
          {source}
        </span>
      )}
    </div>
  )
}
