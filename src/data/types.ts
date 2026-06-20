// 資料架構型別定義
// fashion-archive — independent educational portfolio project

export type Confidence = 'verified' | 'widely-reported' | 'contested'

export type CaseType =
  | 'runway'
  | 'campaign'
  | 'icon-look'
  | 'brand-moment'
  | 'garment-debut'
  | 'cultural-collision'

export type TrendCategory =
  | 'silhouette'
  | 'logo-anti-logo'
  | 'street-luxury'
  | 'gender'
  | 'celebrity-commerce'
  | 'material-texture'

export type GarmentCategory =
  | 'outerwear'
  | 'tailoring'
  | 'denim'
  | 'footwear'
  | 'bag'
  | 'knitwear'
  | 'jersey'

// 每個事實宣稱附來源備注
export interface SourceNote {
  claim: string
  source: string
  year?: number
  confidence: Confidence
  notes?: string // 額外說明或爭議點
}

export interface ImageRef {
  url?: string         // 只允許外部 URL，不提交品牌圖片進 repo
  description: string  // 無圖時的視覺描述 / alt text
  credit?: string      // 來源說明
  type: 'external-url' | 'placeholder' | 'abstract-only'
}

// 案例：秀場 / campaign / icon look / 品牌時刻
export interface Case {
  id: string           // 'CASE-1990-001'
  eraId: string        // '1990s'
  type: CaseType
  title: string
  year: number | string // 精確年份或 'c.1977' 形式
  brand?: string
  designer?: string
  subject?: string     // 人物、設計師、秀場名稱
  statement: string    // 一句 editorial 語句（冷、短、準）
  context: string      // 展開後的完整說明（hover/drawer 呈現）
  sourceNotes: SourceNote[]
  visualKeywords: string[]
  imageRef: ImageRef
  tags: string[]
}

// 單品：作為文化符號而非商品
export interface Garment {
  id: string           // 'GARM-001'
  name: string
  category: GarmentCategory
  statement: string    // 一句定義文化地位的 editorial 語句
  culturalFunction: string // 在時裝史上的功能
  keyMoments: {
    year: number | string
    description: string
    eraId: string
    caseId?: string
  }[]
  brands: string[]     // 品牌名稱（文字，無圖）
  sourceNotes: SourceNote[]
  visualKeywords: string[]
}

// 跨年代趨勢
export interface Trend {
  id: string
  name: string
  category: TrendCategory
  statement: string
  description: string
  eras: string[]       // 出現的年代 id 陣列
  caseRefs: string[]   // 相關案例 id
  garmentRefs: string[]
}

// 年代主體
export interface Era {
  id: string           // '1970s'
  period: string       // '1970–1979'
  decade: number       // 1970
  title: string        // 章節標題
  statement: string    // 一句 editorial statement（外層顯示，極短）
  narrativeCore: string // 核心張力（內部 note，不直接顯示）
  contextExpanded: string // 展開後的脈絡說明
  visualKeywords: string[]
  trendTags: string[]
  colorProfile: {
    primary: string    // hex
    secondary: string
    accent?: string
    mood: string       // 描述性詞語
  }
  caseIds: string[]
  garmentIds: string[]
  caseIndex: string    // 'ERA-1970'
  sourceNotes: SourceNote[]
}

// 網站整體 archive 設定
export interface ArchiveConfig {
  title: string
  subtitle: string
  coverStatement: string
  thesisLines: string[]
  disclaimer: string
  credits: string
  version: string
  lastUpdated: string
}
