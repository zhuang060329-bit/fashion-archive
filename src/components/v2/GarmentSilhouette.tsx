import type { GarmentCategory } from '@/data/types'

// 純幾何抽象輪廓——不是任何真實品牌單品的描圖，只是用簡單線稿暗示
// 「這是某一類服裝的剪影」，當作 specimen card 的背景浮水印。
// SVG inline，沒有外部圖片。
const PATHS: Record<GarmentCategory, string> = {
  outerwear: 'M20 10 L40 4 L60 10 L60 30 L72 36 L72 90 L52 90 L52 50 L48 50 L48 90 L28 90 L28 36 L8 36 L8 30 Z',
  tailoring: 'M30 8 L50 8 L62 18 L56 24 L50 18 L50 90 L30 90 L30 18 L24 24 L18 18 Z',
  denim: 'M24 6 H56 L60 30 L52 30 L50 90 H40 L38 50 H42 L40 30 H30 L28 90 H38 V92 H22 L20 30 L12 30 Z',
  footwear: 'M6 70 H50 C66 70 76 78 76 86 H6 Z M10 70 L16 38 L40 34 L48 50 L48 70 Z',
  bag: 'M22 28 C22 14 58 14 58 28 V36 H22 Z M14 36 H66 L62 88 H18 Z',
  knitwear: 'M16 22 L36 8 H44 L64 22 L58 34 L48 28 V90 H32 V28 L22 34 Z',
  jersey: 'M18 18 L34 8 H46 L62 18 L56 32 L48 26 V90 H32 V26 L24 32 Z',
}

export function GarmentSilhouette({ category, color }: { category: GarmentCategory; color: string }) {
  return (
    <svg
      viewBox="0 0 80 96"
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: '-0.5rem',
        bottom: '-0.5rem',
        width: '5.5rem',
        height: '6.5rem',
        opacity: 0.14,
        pointerEvents: 'none',
      }}
    >
      <path d={PATHS[category]} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}
