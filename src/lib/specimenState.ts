import type { CaseType, GarmentCategory } from '@/data/types'

// Lab 分類標籤——這是策展用的展示分類，不是史實宣稱，純粹用來讓每張
// specimen card 多一層「標本狀態」資訊，呼應 Phase 6C 要求的
// folded / worn / mass / rare / synthetic / uniform 詞彙集合。
export type SpecimenState = 'FOLDED' | 'WORN' | 'MASS' | 'RARE' | 'SYNTHETIC' | 'UNIFORM'

const CASE_STATE: Record<CaseType, SpecimenState> = {
  runway: 'WORN',
  campaign: 'MASS',
  'icon-look': 'RARE',
  'brand-moment': 'UNIFORM',
  'garment-debut': 'FOLDED',
  'cultural-collision': 'SYNTHETIC',
}

const GARMENT_STATE: Record<GarmentCategory, SpecimenState> = {
  outerwear: 'WORN',
  tailoring: 'UNIFORM',
  denim: 'MASS',
  footwear: 'RARE',
  bag: 'RARE',
  knitwear: 'FOLDED',
  jersey: 'SYNTHETIC',
}

export function getCaseSpecimenState(type: CaseType): SpecimenState {
  return CASE_STATE[type]
}

export function getGarmentSpecimenState(category: GarmentCategory): SpecimenState {
  return GARMENT_STATE[category]
}
