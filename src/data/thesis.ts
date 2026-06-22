// 全站 thesis —— 確認方向：每個年代是「服裝承載身分的一種新機制」。
// 由 EntryScene（hero）、年代索引條、EraScene 標頭、ClosingThesis 共用，
// 確保六個 surface 圍繞同一條主張，而不是各自獨立的案例列。
//
// 文案聲音：curator note / fashion criticism，具體、冷、有判斷；
// 不用 lab/telemetry 詞彙，不用無來源的「verified / widely reported」自證。

export interface EraMechanism {
  id: string
  decade: number
  period: string
  // 一個動詞性的「機制」名——服裝在這個年代如何承載身分
  mechanism: string
  // 機制的一句具體展開（curator 觀點，非格言）
  thesisLine: string
  // 該年代最具體的一個材料/物件關鍵詞
  material: string
}

export const SITE_THESIS = {
  // hero 主張：可放在巨型標題之下，thesis-key 標出關鍵詞
  lead: 'Clothing does not follow trends. It keeps finding new ways to carry who you are.',
  body:
    'After 1970, identity stopped living in the cut of a garment and moved into how the garment is read — as allegiance, as structure, as refusal, as image, as signal, as silence. Six mechanisms. One body underneath.',
  // 機制序列，給索引條與結尾用
  sequence: ['allegiance', 'structure', 'refusal', 'image', 'signal', 'silence'],
}

export const ERA_MECHANISMS: EraMechanism[] = [
  {
    id: '1970s',
    decade: 1970,
    period: '1970–79',
    mechanism: 'Allegiance',
    thesisLine:
      'Two crowds split one decade. Disco dressed the body to be seen; punk ripped it to be read. Either way, what you wore announced which side you stood on.',
    material: 'ripped calico',
  },
  {
    id: '1980s',
    decade: 1980,
    period: '1980–89',
    mechanism: 'Structure',
    thesisLine:
      'The shoulder became architecture and the logo learned to speak. Dressing turned into a statement about power — who held it, and who was building the company that sold it.',
    material: 'padded wool',
  },
  {
    id: '1990s',
    decade: 1990,
    period: '1990–99',
    mechanism: 'Refusal',
    thesisLine:
      'After the volume, the void. Margiela hid the label, Lang stripped the seam, Sander removed the noise. Identity was carried by what the garment refused to say.',
    material: 'raw white cotton',
  },
  {
    id: '2000s',
    decade: 2000,
    period: '2000–09',
    mechanism: 'Image',
    thesisLine:
      'The photograph outran the garment. What a bag meant was decided on a sidewalk by a flashbulb, not on a runway. You dressed for the image of yourself.',
    material: 'monogram canvas',
  },
  {
    id: '2010s',
    decade: 2010,
    period: '2010–19',
    mechanism: 'Signal',
    thesisLine:
      'The hierarchy collapsed into a feed. A box logo, a courier graphic, a chunky sole — each was a signal priced by scarcity and velocity, not by craft.',
    material: 'screen-printed jersey',
  },
  {
    id: '2020s',
    decade: 2020,
    period: '2020–',
    mechanism: 'Silence',
    thesisLine:
      'The loudest move became saying nothing. No logo, heavy cashmere, a coat that only reads if you already know. Identity withdrew into material and the people who can recognise it.',
    material: 'undyed cashmere',
  },
]

export function getMechanism(id: string): EraMechanism | undefined {
  return ERA_MECHANISMS.find((m) => m.id === id)
}
