import type { Confidence } from '@/data/types'

const LABEL: Record<Confidence, string> = {
  verified: 'VERIFIED',
  'widely-reported': 'REPORTED',
  contested: 'CONTESTED',
}

const COLOR: Record<Confidence, string> = {
  verified: 'var(--color-era-20)',
  'widely-reported': 'var(--color-archive-400)',
  contested: 'var(--color-era-10)',
}

// 橡皮章視覺，取代純文字的 confidence 標籤——服務「標本檢查」概念：
// 每張卡都像被一個 archivist 蓋過章，不是商品標籤。
export function SpecimenStamp({ confidence }: { confidence: Confidence }) {
  return (
    <span className="lab-stamp" style={{ color: COLOR[confidence] }}>
      ● {LABEL[confidence]}
    </span>
  )
}
