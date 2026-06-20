import type { Trend } from './types'

// 跨年代趨勢系統
// 每個 trend 可跨越多個年代，以不同形式出現

export const trends: Trend[] = [
  {
    id: 'TREND-001',
    name: 'Silhouette Politics',
    category: 'silhouette',
    statement: 'Each decade proposes a different body. The body is always an argument.',
    description:
      'Fashion\'s desired silhouette has never been neutral: it reflects economic anxiety, gender ideology, cultural aspiration, and political mood. The 1970s allowed multiple competing shapes — flare, bias, punk structure. The 1980s imposed width at the shoulders. The 1990s stripped back and elongated. The 2000s reduced and lowered. The 2010s mixed extremes. The 2020s fragment into simultaneous, irreconcilable silhouettes existing simultaneously.',
    eras: ['1970s', '1980s', '1990s', '2000s', '2010s', '2020s'],
    caseRefs: ['CASE-1980-002', 'CASE-1990-003', 'CASE-2020-002'],
    garmentRefs: ['GARM-001', 'GARM-007'],
  },

  {
    id: 'TREND-002',
    name: 'Logo / Anti-Logo',
    category: 'logo-anti-logo',
    statement: 'The logo arrives. The anti-logo arrives. The logo returns.',
    description:
      'The logo has been fashion\'s primary instrument of aspiration and its primary target of refusal. LVMH\'s formation (1987) industrialized logo strategy. Minimalism\'s 1990s response stripped it away. The 2000s It Bag era reimposed monogram culture. Vetements\' DHL shirt (2016) made the logo ironic — then sold it as a luxury item. Quiet luxury\'s 2020s proposition: the absence of the logo is itself a sign readable only by the initiated.',
    eras: ['1980s', '1990s', '2000s', '2010s', '2020s'],
    caseRefs: ['CASE-1980-003', 'CASE-2000-002', 'CASE-2010-001', 'CASE-2020-004'],
    garmentRefs: ['GARM-005', 'GARM-009', 'GARM-010'],
  },

  {
    id: 'TREND-003',
    name: 'Street → Runway',
    category: 'street-luxury',
    statement: 'Subculture dresses. Fashion photographs it. Then sells it back.',
    description:
      'The movement of subcultural dress into luxury fashion has been a recurring structure since at least the 1970s punk moment. Each absorption transforms the original: punk becomes Westwood premium; hip-hop becomes Dapper Dan, then Gucci; skateboarding becomes Supreme, then Supreme × LV; sportswear becomes Balenciaga Triple S. The original subculture is rarely compensated or credited; its aesthetic is extracted as content.',
    eras: ['1970s', '1980s', '1990s', '2000s', '2010s', '2020s'],
    caseRefs: ['CASE-1970-001', 'CASE-1990-002', 'CASE-2010-001', 'CASE-2010-002'],
    garmentRefs: ['GARM-001', 'GARM-002', 'GARM-004'],
  },

  {
    id: 'TREND-004',
    name: 'Gender as Material',
    category: 'gender',
    statement: 'The question of who the garment is for has no answer. That is the design.',
    description:
      'Fashion has negotiated gender through dressing since at least Yves Saint Laurent\'s Le Smoking (1966 debut). Each decade\'s approach differs: 1970s androgyny was sexual ambiguity (Bianca Jagger, David Bowie); 1980s power dressing was gender assertion through masculine codes borrowed for women; 1990s fashion used genderless minimalism; 2010s streetwear mixed gender-coded garments as aesthetic statement; 2020s fluidity arrived at the mainstream fashion moment through celebrity coverage (Harry Styles, Billy Porter) and brand design choices.',
    eras: ['1970s', '1980s', '1990s', '2010s', '2020s'],
    caseRefs: ['CASE-1970-003', 'CASE-1990-001', 'CASE-2020-001'],
    garmentRefs: ['GARM-007'],
  },

  {
    id: 'TREND-005',
    name: 'Celebrity as Distribution Channel',
    category: 'celebrity-commerce',
    statement: 'The image of the garment being worn outpaces the garment being bought.',
    description:
      'The relationship between celebrity and fashion has shifted from endorsement to co-authorship to trend generation. The 1980s used celebrity in advertising (Brooke Shields for Calvin Klein). The 1990s saw celebrity styling as editorial direction. The 2000s paparazzi economy made celebrity street looks into immediate trend events (the Balenciaga City bag\'s cultural rise was driven by unscripted celebrity use). The 2010s and 2020s saw social media and TikTok compress this cycle to hours. The stylist, the algorithm, and the celebrity have replaced the editor as trend arbiters.',
    eras: ['1980s', '1990s', '2000s', '2010s', '2020s'],
    caseRefs: ['CASE-1980-001', 'CASE-2000-001', 'CASE-2000-004', 'CASE-2020-001'],
    garmentRefs: ['GARM-005'],
  },
]

export function getTrendById(id: string): Trend | undefined {
  return trends.find((t) => t.id === id)
}

export function getTrendsByEra(eraId: string): Trend[] {
  return trends.filter((t) => t.eras.includes(eraId))
}

export function getTrendsByCategory(category: string): Trend[] {
  return trends.filter((t) => t.category === category)
}
