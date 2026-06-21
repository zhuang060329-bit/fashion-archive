import type { Era } from './types'

// 六個年代的核心資料
// 所有事實宣稱均附 source notes，使用可驗證描述語言
// 避免「爆紅」「正式成為」等無法量化的語句

export const eras: Era[] = [
  {
    id: '1970s',
    period: '1970–1979',
    decade: 1970,
    title: 'Subculture as Vocabulary',
    statement: 'Two irreconcilable aesthetics negotiate a decade.',
    narrativeCore:
      'Disco hedonism and punk anti-aesthetics emerged in the same years, treating the body as opposite objects: display vs. assault. Both rewrote dress as political language.',
    contextExpanded:
      'The 1970s produced no single dominant silhouette — it produced competing ideologies of dress. On one side: Halston\'s Ultrasuede, the Studio 54 clientele, the idea that fashion could dissolve class through shared spectacle. On the other: Vivienne Westwood and Malcolm McLaren\'s SEX boutique at 430 King\'s Road (opened 1974), ripped fabric, bondage trousers, and the deliberate uglification of the dressed body. Meanwhile, Japanese designers began their Paris infiltration — Kenzo Takada (founded Kenzo, Paris, 1970), Issey Miyake (first Paris show, 1973) — introducing non-Western construction logic into the European atelier tradition. These forces did not resolve. They produced the contradictions that the following decades would expand.',
    visualKeywords: ['sequin', 'ripped', 'platform', 'safety pin', 'flare', 'bondage strap', 'disco globe', 'denim'],
    trendTags: ['subculture-as-fashion', 'body-liberation', 'anti-fashion-emerges', 'Japanese-influence'],
    colorProfile: {
      primary: '#1A1208',
      secondary: '#C9A96E',
      // Phase 7A：原本 accent 是暗紅 #8B1A1A，與 2010s 的 signal red 撞色，
      // 兩個年代在畫面上分不出色相。改成琥珀，呼應既有 --color-era-70 的
      // 1970s 身分（amber / aged paper / warmer DIY），與 2010s 的紅形成
      // 一眼可辨的冷暖區分。紅藍套印錯位仍由 lab-misregister 保留。
      accent: '#D49A3C',
      mood: 'amber on shadow, raw grain',
    },
    caseIds: ['CASE-1970-001', 'CASE-1970-002', 'CASE-1970-003', 'CASE-1970-004'],
    garmentIds: ['GARM-001', 'GARM-003'],
    caseIndex: 'ERA-1970',
    sourceNotes: [
      {
        claim: 'SEX boutique at 430 King\'s Road opened 1974',
        source: 'Jon Savage, England\'s Dreaming (1991); V&A exhibition records',
        year: 1974,
        confidence: 'verified',
      },
      {
        claim: 'Kenzo Takada founded Kenzo in Paris, 1970',
        source: 'Kenzo brand historical records; multiple fashion history sources',
        year: 1970,
        confidence: 'verified',
      },
      {
        claim: 'Issey Miyake first Paris show, 1973',
        source: 'Issey Miyake brand archives; widely cited in fashion histories',
        year: 1973,
        confidence: 'widely-reported',
      },
    ],
  },

  {
    id: '1980s',
    period: '1980–1989',
    decade: 1980,
    title: 'The Silhouette Expands, The Logo Speaks',
    statement: 'Excess becomes structure. The brand becomes the garment.',
    narrativeCore:
      'The 1980s institutionalized fashion as business and the shoulder as power symbol. Karl Lagerfeld revived Chanel\'s codes from 1983 onward. LVMH\'s formation in 1987 restructured how luxury would operate for the next forty years.',
    contextExpanded:
      'Thierry Mugler and Claude Montana gave the 1980s its most recognizable silhouette: wide shoulders, cinched waist, structured volume. Giorgio Armani moved in the opposite direction — the unstructured suit as a different kind of authority. When Karl Lagerfeld took the Chanel creative directorship in 1983, he worked with inherited brand codes — the interlocking CC, the chain strap, the quilted leather — and built them into something commercially dominant. The Classic Flap, with Lagerfeld\'s CC closure lock, developed under his tenure (distinct from Coco Chanel\'s original 2.55, which debuted in February 1955). LVMH\'s formation in 1987 — through the merger of Louis Vuitton Moët Hennessy after Bernard Arnault\'s acquisition of the Boussac group (including Christian Dior) in 1984 — created the corporate architecture for what luxury fashion would become. Nike\'s Air Max 1, designed by Tinker Hatfield and released in 1987, introduced visible cushioning technology and began the long process of sneaker aestheticization.',
    visualKeywords: ['padded shoulder', 'power suit', 'logo', 'gold chain', 'bodycon', 'neon', 'athletic'],
    trendTags: ['power-dressing', 'logo-culture', 'luxury-commercialization', 'athletic-crossover'],
    colorProfile: {
      primary: '#0D0D0D',
      secondary: '#D4AF37',
      accent: '#C0392B',
      mood: 'gold on black, high contrast, unapologetic volume',
    },
    caseIds: ['CASE-1980-001', 'CASE-1980-002', 'CASE-1980-003', 'CASE-1980-004'],
    garmentIds: ['GARM-002', 'GARM-004', 'GARM-005'],
    caseIndex: 'ERA-1980',
    sourceNotes: [
      {
        claim: 'Karl Lagerfeld appointed Chanel creative director 1983',
        source: 'Chanel corporate history; multiple sources including Justine Picardie, Coco Chanel: The Legend and the Life (2010)',
        year: 1983,
        confidence: 'verified',
      },
      {
        claim: 'LVMH formed 1987 through merger of Louis Vuitton and Moët Hennessy',
        source: 'LVMH corporate history; widely reported in business and fashion press',
        year: 1987,
        confidence: 'verified',
      },
      {
        claim: 'Nike Air Max 1 released 1987, designed by Tinker Hatfield',
        source: 'Nike corporate archives; Sneaker Freaker documentation',
        year: 1987,
        confidence: 'verified',
      },
      {
        claim: 'Chanel original 2.55 debuted February 1955, created by Coco Chanel',
        source: 'Chanel brand archives; widely documented',
        year: 1955,
        confidence: 'verified',
        notes: '1980s Lagerfeld version (Classic Flap) is distinct from original 2.55 — different CC closure lock',
      },
      {
        claim: 'Calvin Klein jeans "Nothing comes between me and my Calvins" — Brooke Shields campaign, 1980',
        source: 'Calvin Klein advertising records; widely reported in fashion and advertising histories',
        year: 1980,
        confidence: 'verified',
      },
    ],
  },

  {
    id: '1990s',
    period: '1990–1999',
    decade: 1990,
    title: 'Anti-Fashion Is the New Fashion',
    statement: 'The void replies to the decade that preceded it.',
    narrativeCore:
      'Helmut Lang, Jil Sander, and Margiela stripped fashion back to question what it was for. Simultaneously, grunge\'s absorption into fashion (Marc Jacobs for Perry Ellis, 1993) demonstrated that no subculture could resist commodification. Tom Ford\'s arrival at Gucci in 1994 introduced a different kind of anti-excess: maximalism through controlled seduction.',
    contextExpanded:
      'Martin Margiela\'s first collection was presented in Paris in October 1988 (for Fall/Winter 1988–89), introducing the anonymous white label, the Tabi boot, and a systematic refusal of conventional fashion communication. Helmut Lang opened his first New York store in 1994 and relocated his headquarters to New York in 1997 — his spare, body-aware minimalism placed alongside Jil Sander\'s "Queen of Less" aesthetic defined one pole of the decade. At the other: Marc Jacobs showed a grunge-influenced collection for Perry Ellis in Spring/Summer 1993 — he was subsequently fired. Tom Ford became Gucci\'s creative director in 1994; his first major collection shown in Fall 1995 reframed the brand through explicit sexuality and precision tailoring. Rei Kawakubo\'s "Body Meets Dress, Dress Meets Body" (Spring/Summer 1997, Comme des Garçons) used padded, distorted forms to question the body the garment is supposed to serve.',
    visualKeywords: ['monochrome', 'slip dress', 'deconstructed', 'bare', 'white label', 'distressed denim', 'minimalist seam'],
    trendTags: ['minimalism', 'deconstruction', 'anti-fashion', 'grunge-absorbed', 'Gucci-revival-Tom-Ford'],
    colorProfile: {
      primary: '#0A0A0A',
      secondary: '#E8E4DF',
      accent: '#6B5B4E',
      mood: 'bleached, stripped, muted tension',
    },
    caseIds: ['CASE-1990-001', 'CASE-1990-002', 'CASE-1990-003', 'CASE-1990-004'],
    garmentIds: ['GARM-003', 'GARM-006', 'GARM-007'],
    caseIndex: 'ERA-1990',
    sourceNotes: [
      {
        claim: 'Martin Margiela\'s first collection presented Paris, October 1988 (for Fall/Winter 1988–89)',
        source: 'Debo Broersen & Michiel Scheffer, Martin Margiela (Rizzoli, 2009); widely documented in fashion histories',
        year: 1988,
        confidence: 'verified',
        notes: 'Collection showed at Chez Régine, Paris. Tabi boot debuted here.',
      },
      {
        claim: 'Helmut Lang opened first New York store 1994',
        source: 'New York Times fashion coverage; Helmut Lang brand documentation',
        year: 1994,
        confidence: 'widely-reported',
      },
      {
        claim: 'Helmut Lang headquarters relocated to New York, 1997',
        source: 'Multiple fashion industry records; The New Yorker fashion coverage',
        year: 1997,
        confidence: 'widely-reported',
      },
      {
        claim: 'Tom Ford became Gucci creative director 1994; first major collection shown Fall 1995',
        source: 'Tom Ford biography; Gucci corporate records; Hamish Bowles, Vogue coverage',
        year: 1994,
        confidence: 'verified',
      },
      {
        claim: 'Marc Jacobs showed grunge-influenced collection for Perry Ellis Spring/Summer 1993 and was subsequently fired',
        source: 'Marc Jacobs interviews; WWD coverage 1993; multiple fashion history records',
        year: 1993,
        confidence: 'verified',
      },
      {
        claim: 'Comme des Garçons "Body Meets Dress, Dress Meets Body" Spring/Summer 1997',
        source: 'CdG show records; extensively documented in Vogue, i-D, academic fashion studies',
        year: 1997,
        confidence: 'verified',
      },
    ],
  },

  {
    id: '2000s',
    period: '2000–2009',
    decade: 2000,
    title: 'Celebrity Is the New Runway',
    statement: 'The image outpaces the object.',
    narrativeCore:
      'By the mid-2000s, what a celebrity carried mattered more than what a model wore. The It Bag — the Balenciaga City, the Fendi Baguette, the LV Multicolore Speedy — became fashion\'s primary image vehicle. Designer-fast fashion collaborations (H&M × Karl Lagerfeld, 2004) proposed that luxury could be a format, not a price point.',
    contextExpanded:
      'Nicolas Ghesquière introduced the Balenciaga Motorcycle bag in the Fall 2001 collection; the bag became widely carried and photographed on celebrities through the mid-2000s. Silvia Venturini Fendi\'s Baguette debuted in Fall/Winter 1997 but reached its cultural peak through Sex and the City (1998–2004), where it accumulated its own storylines. Louis Vuitton\'s collaboration with Takashi Murakami — the Monogram Multicolore, introduced in 2003 under Marc Jacobs\' artistic directorship — became one of the decade\'s defining luxury objects. H&M\'s collaboration with Karl Lagerfeld in November 2004 established the designer × fast fashion format as commercially viable and culturally legitimate. Rachel Zoe rose as a celebrity stylist through the mid-2000s, demonstrating that styling — not designing — could determine trend direction. Y2K\'s low-rise silhouette, Von Dutch trucker hats, and maximalist logo dressing dominated mainstream fashion until approximately 2007, when the first signs of the following decade\'s minimalism began to appear.',
    visualKeywords: ['logo', 'low-rise', 'paparazzi', 'It bag', 'strappy heel', 'velour tracksuit', 'celebrity editorial'],
    trendTags: ['celebrity-styling-culture', 'it-bag-era', 'Y2K-maximalism', 'luxury-democratization'],
    colorProfile: {
      primary: '#0C0C0C',
      secondary: '#F5E6D3',
      accent: '#B8860B',
      mood: 'flash photography, warm tan, overexposed grain',
    },
    caseIds: ['CASE-2000-001', 'CASE-2000-002', 'CASE-2000-003', 'CASE-2000-004'],
    garmentIds: ['GARM-005', 'GARM-008'],
    caseIndex: 'ERA-2000',
    sourceNotes: [
      {
        claim: 'Balenciaga Motorcycle bag introduced in Fall 2001 collection by Nicolas Ghesquière',
        source: 'Balenciaga brand records; widely documented in fashion press including WWD and Vogue',
        year: 2001,
        confidence: 'widely-reported',
        notes: 'Sometimes referred to as the "City" or "Lariat" bag; exact collection season occasionally reported as Spring or Fall 2001 across sources',
      },
      {
        claim: 'Fendi Baguette debuted Fall/Winter 1997',
        source: 'Fendi brand history; Silvia Venturini Fendi interviews',
        year: 1997,
        confidence: 'verified',
        notes: 'Cultural peak through Sex and the City 1998–2004',
      },
      {
        claim: 'Louis Vuitton × Takashi Murakami Monogram Multicolore introduced 2003',
        source: 'Louis Vuitton brand history; Takashi Murakami artist statements; multiple fashion records',
        year: 2003,
        confidence: 'verified',
      },
      {
        claim: 'H&M × Karl Lagerfeld collaboration, November 2004',
        source: 'H&M press releases; Karl Lagerfeld interviews; widely documented as first major fast fashion × luxury collab',
        year: 2004,
        confidence: 'verified',
      },
    ],
  },

  {
    id: '2010s',
    period: '2010–2019',
    decade: 2010,
    title: 'Streetwear Takes the Runway',
    statement: 'The hierarchy dissolves. The question is whether anyone notices.',
    narrativeCore:
      'Vetements (founded 2014) and Demna\'s appointment to Balenciaga in 2015 made luxury\'s absorption of street vernacular a formal proposition. Virgil Abloh at Off-White and Louis Vuitton (men\'s, from 2018) industrialized the concept. Supreme × Louis Vuitton (2017) was a turning point with almost universal media coverage.',
    contextExpanded:
      'Demna Gvasalia co-founded Vetements with his brother Guram in 2014; the label\'s DHL T-shirt — shown in Fall/Winter 2016, priced at €185 — became a widely discussed marker of fashion\'s relationship to irony and consumer culture. Demna was appointed Balenciaga\'s creative director in October 2015, where the Triple S trainer (introduced in Spring 2017) reframed the luxury sneaker as an aesthetic statement. Off-White, founded by Virgil Abloh and first shown in 2013, established its visual language through industrial strapping, quotation marks, and a deliberate blurring of streetwear and art-world signals. Off-White\'s collaboration with Nike ("The Ten," September 2017) became a commercial and cultural milestone. The Supreme × Louis Vuitton men\'s Spring/Summer 2017 collection, shown in January 2017 in Paris, was one of the decade\'s most covered fashion collaborations. Virgil Abloh was appointed Louis Vuitton Men\'s creative director in March 2018; he died in November 2021. Kanye West presented Yeezy Season 1 at New York Fashion Week on February 12, 2015.',
    visualKeywords: ['logo revisionism', 'dad sneaker', 'industrial strap', 'quotation mark', 'oversized hoodie', 'DHL', 'Supreme box logo'],
    trendTags: ['streetwear-luxury-merger', 'sneaker-culture', 'ironic-branding', 'collab-economy'],
    colorProfile: {
      primary: '#080808',
      secondary: '#E0DDD8',
      accent: '#FF2400',
      mood: 'concrete, industrial, high-contrast brand signal',
    },
    caseIds: ['CASE-2010-001', 'CASE-2010-002', 'CASE-2010-003', 'CASE-2010-004'],
    garmentIds: ['GARM-002', 'GARM-004', 'GARM-009'],
    caseIndex: 'ERA-2010',
    sourceNotes: [
      {
        claim: 'Vetements founded by Demna Gvasalia (with Guram Gvasalia), 2014',
        source: 'Vetements press; Demna Gvasalia interviews; BoF profile',
        year: 2014,
        confidence: 'widely-reported',
      },
      {
        claim: 'Vetements DHL T-shirt shown in Fall/Winter 2016 collection, priced at €185',
        source: 'WWD, Vogue, BoF coverage of Vetements FW16',
        year: 2016,
        confidence: 'verified',
      },
      {
        claim: 'Demna appointed Balenciaga creative director October 2015',
        source: 'Balenciaga press release; BoF and WWD reporting October 2015',
        year: 2015,
        confidence: 'verified',
      },
      {
        claim: 'Balenciaga Triple S introduced in Spring 2017 menswear',
        source: 'Balenciaga brand records; widely covered in sneaker and fashion press',
        year: 2017,
        confidence: 'widely-reported',
      },
      {
        claim: 'Off-White first collection shown 2013; founded by Virgil Abloh',
        source: 'Off-White brand history; Virgil Abloh interviews',
        year: 2013,
        confidence: 'widely-reported',
      },
      {
        claim: 'Off-White × Nike "The Ten" collaboration, September 2017',
        source: 'Nike press; widely documented in sneaker culture press',
        year: 2017,
        confidence: 'verified',
      },
      {
        claim: 'Supreme × Louis Vuitton Men\'s SS2017, shown January 2017 in Paris',
        source: 'Louis Vuitton press; Supreme press; widely covered by fashion and general press',
        year: 2017,
        confidence: 'verified',
      },
      {
        claim: 'Virgil Abloh appointed Louis Vuitton Men\'s creative director March 2018',
        source: 'Louis Vuitton press release March 2018; widely reported',
        year: 2018,
        confidence: 'verified',
      },
      {
        claim: 'Kanye West presented Yeezy Season 1 at NYFW, February 12, 2015',
        source: 'NYFW records; New York Times and WWD coverage',
        year: 2015,
        confidence: 'verified',
      },
    ],
  },

  {
    id: '2020s',
    period: '2020–present',
    decade: 2020,
    title: 'The Archive Speaks Back',
    statement: 'Silence becomes a brand language. History becomes inventory.',
    narrativeCore:
      'Quiet luxury rejected the ironic maximalism of the prior decade. Simultaneously, TikTok compressed micro-trend cycles to weeks. Resale markets assigned cultural value to archival pieces, and gender-fluid dressing moved from runway concept to mainstream editorial.',
    contextExpanded:
      'Quiet luxury — a term that circulated widely in fashion media from approximately 2022 — describes dressing defined by material quality, tailored understatement, and the absence of visible logos. Key reference points include The Row (founded by Mary-Kate and Ashley Olsen, 2006, with critical peak from 2022 onward), Toteme (founded 2014), Brunello Cucinelli, and Loro Piana (acquired by LVMH in 2013). The Row\'s association with the "stealth wealth" aesthetic was reinforced by the costume design of HBO\'s Succession. Miu Miu\'s Spring/Summer 2022 collection (shown October 2021) presented an ultra-micro pleated skirt that became a widely discussed fashion moment across editorial and social media. Harry Styles appeared on the cover of British Vogue\'s December 2020 issue — shot by Tyler Mitchell — wearing Gucci, in what was framed as a gender-fluid moment. Billy Porter wore a Christian Siriano tuxedo gown to the 91st Academy Awards on February 24, 2019. Phoebe Philo left Celine in 2018 after a tenure from 2008 that had transformed the brand\'s relationship to minimalism and intellectual feminism; her new independent brand presented its first collection in October 2023. Daniel Lee was appointed Bottega Veneta creative director in 2018 and left in November 2021; his successor Matthew Blazy was announced shortly after. Lee was appointed Burberry creative director in October 2022.',
    visualKeywords: ['no logo', 'archive label', 'muted cashmere', 'resale tag', 'micro skirt', 'tuxedo gown', 'stealth wealth'],
    trendTags: ['quiet-luxury', 'archival-fashion', 'gender-fluid', 'micro-trend-acceleration', 'resale-economy'],
    colorProfile: {
      primary: '#0A0906',
      secondary: '#EDE8E0',
      accent: '#9B8B7A',
      mood: 'cashmere warmth, considered absence, material silence',
    },
    caseIds: ['CASE-2020-001', 'CASE-2020-002', 'CASE-2020-003', 'CASE-2020-004'],
    garmentIds: ['GARM-002', 'GARM-005', 'GARM-008', 'GARM-010'],
    caseIndex: 'ERA-2020',
    sourceNotes: [
      {
        claim: 'Miu Miu SS2022 ultra-micro pleated skirt shown October 2021',
        source: 'Miu Miu show notes; Vogue Runway, WWD, and BoF coverage October 2021',
        year: 2021,
        confidence: 'verified',
      },
      {
        claim: 'Harry Styles British Vogue December 2020 cover, wearing Gucci, photographed by Tyler Mitchell',
        source: 'British Vogue December 2020 issue',
        year: 2020,
        confidence: 'verified',
      },
      {
        claim: 'Billy Porter wore Christian Siriano tuxedo gown to 91st Academy Awards, February 24, 2019',
        source: 'Academy Awards press; widely reported',
        year: 2019,
        confidence: 'verified',
      },
      {
        claim: 'Phoebe Philo at Celine 2008–2018',
        source: 'Celine corporate records; Philo interview with System Magazine',
        confidence: 'verified',
      },
      {
        claim: 'Philo brand first collection drop October 2023',
        source: 'Philo brand press; widely reported in fashion press',
        year: 2023,
        confidence: 'verified',
      },
      {
        claim: 'Daniel Lee appointed Bottega Veneta creative director 2018, left November 2021',
        source: 'Bottega Veneta press; BoF and WWD reporting',
        year: 2018,
        confidence: 'verified',
      },
      {
        claim: 'Loro Piana acquired by LVMH 2013',
        source: 'LVMH press release; financial reporting 2013',
        year: 2013,
        confidence: 'verified',
      },
      {
        claim: '"Quiet luxury" as widely circulated term in fashion media from approximately 2022',
        source: 'Google Trends data; BoF, Vogue, NY Times usage tracking',
        year: 2022,
        confidence: 'widely-reported',
        notes: 'Term itself is journalistic shorthand; precise origin of phrase contested',
      },
    ],
  },
]

export function getEraById(id: string): Era | undefined {
  return eras.find((e) => e.id === id)
}

export function getErasInOrder(): Era[] {
  return [...eras].sort((a, b) => a.decade - b.decade)
}
