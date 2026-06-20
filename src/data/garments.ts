import type { Garment } from './types'

// 單品索引：作為文化符號，不作為商品卡片
// 每件單品的文化功能跨越多個年代

export const garments: Garment[] = [
  {
    id: 'GARM-001',
    name: 'Leather Jacket',
    category: 'outerwear',
    statement: 'Rebellion made wearable. Then sold back to the people it was made against.',
    culturalFunction:
      'The leather jacket entered fashion as signifier of motorcyle culture and working-class masculinity (Marlon Brando, The Wild One, 1953). Punk absorbed and politicized it. Later decades commercialized it without exhausting it — Schott, Perfecto, biker cut, moto construction have passed through every decade since.',
    keyMoments: [
      {
        year: 1974,
        description: 'SEX boutique sells leather and bondage-adjacent garments as punk uniform',
        eraId: '1970s',
        caseId: 'CASE-1970-001',
      },
      {
        year: '1990s',
        description: 'Margiela deconstructs and reconstructs the leather jacket as material investigation',
        eraId: '1990s',
        caseId: 'CASE-1990-001',
      },
      {
        year: 2016,
        description: 'Vetements recontextualizes motorcycle silhouette as ironic luxury',
        eraId: '2010s',
      },
    ],
    brands: ['Schott NYC', 'Perfecto', 'Margiela', 'Vetements', 'Balenciaga'],
    sourceNotes: [
      {
        claim: 'Brando leather jacket in The Wild One (1953) as fashion reference point',
        source: 'Widely documented in fashion history; V&A Fashion exhibition records',
        year: 1953,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['black', 'zipper', 'hardware', 'asymmetric closure', 'worn-in', 'moto construction'],
  },

  {
    id: 'GARM-002',
    name: 'Sneaker',
    category: 'footwear',
    statement: 'From performance to currency. The object that indexed a generation\'s desire.',
    culturalFunction:
      'The sneaker\'s transition from athletic equipment to fashion object to financial instrument represents one of the most complete cultural transformations of the post-1970 period. Nike Air Jordan 1 (1985), Air Max 1 (1987), and the Adidas Stan Smith codified different vocabularies — sport performance, design fetish, minimalist classic. By the 2010s, the limited-release sneaker had become a speculative asset class.',
    keyMoments: [
      {
        year: 1985,
        description: 'Nike Air Jordan 1 introduced; first season banned by NBA for colorway violations',
        eraId: '1980s',
      },
      {
        year: 1987,
        description: 'Nike Air Max 1 introduces visible Air cushioning',
        eraId: '1980s',
        caseId: 'CASE-1980-004',
      },
      {
        year: 2015,
        description: 'Yeezy Season 1 and Yeezy Boost 750 presented at NYFW; Adidas × Kanye West partnership',
        eraId: '2010s',
      },
      {
        year: 2017,
        description: 'Balenciaga Triple S introduces luxury "ugly sneaker" silhouette',
        eraId: '2010s',
        caseId: 'CASE-2010-003',
      },
      {
        year: 2017,
        description: 'Off-White × Nike "The Ten" deconstructs ten Nike classics',
        eraId: '2010s',
        caseId: 'CASE-2010-004',
      },
    ],
    brands: ['Nike', 'Adidas', 'New Balance', 'Balenciaga', 'Maison Margiela', 'Salehe Bembury'],
    sourceNotes: [
      {
        claim: 'Nike Air Jordan 1 introduced 1985; first season included NBA colorway violations',
        source: 'Nike brand archives; widely documented in sneaker history',
        year: 1985,
        confidence: 'verified',
        notes: 'NBA banned Jordan from wearing the shoe during games due to colorway violations; Nike paid the fine',
      },
    ],
    visualKeywords: ['sole stack', 'colorway', 'limited release', 'lace configuration', 'box unboxing'],
  },

  {
    id: 'GARM-003',
    name: 'Denim',
    category: 'denim',
    statement: 'Workwear. Youth uniform. Luxury object. The garment that absorbs every meaning.',
    culturalFunction:
      'Denim\'s movement from Levi\'s workwear to rebellion uniform (1950s–60s) to the 1970s flare to Calvin Klein\'s campaign (1980) to Marc Jacobs\' grunge luxury layering (1993) to Margiela\'s reconstruction to 2000s low-rise to 2020s wide-leg revival traces a complete cultural circuit. Each decade uses denim to negotiate authenticity versus aspiration.',
    keyMoments: [
      {
        year: '1970s',
        description: 'Flared denim dominant in disco and working-class subcultural dressing',
        eraId: '1970s',
      },
      {
        year: 1980,
        description: 'Calvin Klein jeans campaign transforms denim into aspirational object via celebrity body',
        eraId: '1980s',
        caseId: 'CASE-1980-001',
      },
      {
        year: 1993,
        description: 'Marc Jacobs uses luxury silk slip dress over denim for Perry Ellis grunge collection',
        eraId: '1990s',
        caseId: 'CASE-1990-002',
      },
      {
        year: '2003–2007',
        description: 'Low-rise denim dominant in celebrity styling culture; Von Dutch era',
        eraId: '2000s',
      },
    ],
    brands: ["Levi's", 'Calvin Klein', 'Margiela', 'Helmut Lang', 'Acne Studios'],
    sourceNotes: [],
    visualKeywords: ['indigo', 'raw selvedge', 'distressed', 'flare', 'low-rise', 'patch repair', 'wide-leg'],
  },

  {
    id: 'GARM-004',
    name: 'Hoodie',
    category: 'jersey',
    statement: 'Athletic comfort institutionalized. Then sanctified by a luxury price tag.',
    culturalFunction:
      'The hoodie moved from athletic and workwear garment to hip-hop uniform to high fashion through the 1990s–2010s. Champion\'s reverse weave construction (1938) was adopted by streetwear culture in the 1980s. By the 2010s, luxury hoodies from Vetements, Balenciaga, and Raf Simons sold at hundreds of times the price of the original athletic garment while retaining its visual simplicity.',
    keyMoments: [
      {
        year: '1980s–1990s',
        description: 'Champion and Nike hoodies adopted as streetwear uniform in hip-hop and skateboarding culture',
        eraId: '1990s',
      },
      {
        year: 2016,
        description: 'Vetements sells oversized hoodie at luxury price; styling reframes athletic garment',
        eraId: '2010s',
        caseId: 'CASE-2010-001',
      },
      {
        year: 2017,
        description: 'Balenciaga, Off-White, and Supreme hoodies at multiple hundreds of dollars',
        eraId: '2010s',
      },
    ],
    brands: ['Champion', 'Nike', 'Supreme', 'Vetements', 'Balenciaga', 'Raf Simons'],
    sourceNotes: [
      {
        claim: 'Champion reverse weave construction 1938',
        source: 'Champion brand history; widely documented',
        year: 1938,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['drawstring', 'kangaroo pocket', 'oversized', 'logo chest', 'athletic cotton'],
  },

  {
    id: 'GARM-005',
    name: 'Handbag — The It Object',
    category: 'bag',
    statement: 'Not what\'s inside. What it says from the outside.',
    culturalFunction:
      'The "It Bag" as concept emerged in the late 1990s–2000s: a specific bag that functions as cultural signal rather than utility object. The Fendi Baguette (1997), Balenciaga City (2001), Louis Vuitton Speedy, and Hermès Birkin (1984) each performed this function differently — through scarcity, celebrity adoption, aesthetic novelty, or heritage claim. Ownership communicated location in a social hierarchy.',
    keyMoments: [
      {
        year: 1984,
        description: 'Hermès Birkin bag designed; named for Jane Birkin after a chance meeting with Jean-Louis Dumas on a flight',
        eraId: '1980s',
      },
      {
        year: 1997,
        description: 'Fendi Baguette debuts; reaches cultural peak through Sex and the City',
        eraId: '2000s',
      },
      {
        year: 2001,
        description: 'Balenciaga City bag introduced; celebrity adoption drives demand',
        eraId: '2000s',
        caseId: 'CASE-2000-001',
      },
      {
        year: 2003,
        description: 'LV × Murakami Monogram Multicolore on Speedy format',
        eraId: '2000s',
        caseId: 'CASE-2000-002',
      },
      {
        year: '2018–2021',
        description: 'Bottega Veneta Jodie and Pouch under Daniel Lee; intrecciato revival',
        eraId: '2020s',
      },
    ],
    brands: ['Hermès', 'Fendi', 'Balenciaga', 'Louis Vuitton', 'Bottega Veneta', 'The Row'],
    sourceNotes: [
      {
        claim: 'Hermès Birkin designed 1984; named for Jane Birkin',
        source: 'Hermès brand history; widely documented',
        year: 1984,
        confidence: 'verified',
        notes: 'Design attributed to Jean-Louis Dumas; story of Birkin and Dumas on Paris–London flight is widely reported, though details vary',
      },
    ],
    visualKeywords: ['logo hardware', 'stitch detail', 'structured carry', 'status object', 'celebrity arm'],
  },

  {
    id: 'GARM-006',
    name: 'Tabi Boot',
    category: 'footwear',
    statement: 'The split toe. An argument about the foot that won\'t be resolved.',
    culturalFunction:
      'The Margiela Tabi boot debuted at Martin Margiela\'s first collection in October 1988, referencing Japanese Tabi socks (traditional split-toe socks worn with sandals and zori). The Tabi construction — dividing the toe compartment — has been carried through every subsequent Maison Margiela season and has never ceased production. Its longevity makes it one of fashion\'s most durable single design propositions. Under John Galliano\'s creative direction (from 2014), the Tabi has been extended into new colorways, heel heights, and construction variations.',
    keyMoments: [
      {
        year: 1988,
        description: 'Tabi boot debuted at Margiela\'s first collection, Paris, October 1988',
        eraId: '1990s',
        caseId: 'CASE-1990-001',
      },
      {
        year: '2010s',
        description: 'Tabi adopted by fashion community outside original Margiela context; wider streetwear absorption',
        eraId: '2010s',
      },
      {
        year: '2020s',
        description: 'Under John Galliano, Tabi extended in new directions; remains in continuous production',
        eraId: '2020s',
      },
    ],
    brands: ['Maison Margiela'],
    sourceNotes: [
      {
        claim: 'Tabi boot debuted at Margiela first collection October 1988; references Japanese Tabi socks',
        source: 'Maison Margiela brand documentation; Debo Broersen, Martin Margiela (2009)',
        year: 1988,
        confidence: 'verified',
      },
      {
        claim: 'John Galliano appointed Margiela creative director 2014',
        source: 'Maison Margiela press; widely reported',
        year: 2014,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['split toe', 'black', 'chunky heel', 'Japanese reference', 'boot silhouette', 'continuous design'],
  },

  {
    id: 'GARM-007',
    name: 'Slip Dress',
    category: 'outerwear',
    statement: 'Underwear made outerwear. The inside becomes the outside.',
    culturalFunction:
      'The slip dress — a simple, bias-cut, spaghetti-strap garment derived from lingerie construction — became one of the 1990s\' signature silhouettes. Worn over T-shirts (grunge), under blazers, or alone as statement minimalism, it concentrated the decade\'s aesthetic tensions: exposure vs. layering, luxury vs. refusal, body vs. structure. Calvin Klein, Helmut Lang, and Prada produced definitive versions. Kate Moss and Carolyn Bessette-Kennedy became key references.',
    keyMoments: [
      {
        year: 1993,
        description: 'Marc Jacobs pairs silk slip dress over thermal underwear for Perry Ellis grunge collection',
        eraId: '1990s',
        caseId: 'CASE-1990-002',
      },
      {
        year: '1994–1999',
        description: 'Calvin Klein, Helmut Lang, and Prada produce minimalist slip dress versions; Kate Moss and Carolyn Bessette-Kennedy key wearing references',
        eraId: '1990s',
      },
    ],
    brands: ['Calvin Klein', 'Helmut Lang', 'Prada', 'John Galliano'],
    sourceNotes: [],
    visualKeywords: ['bias cut', 'spaghetti strap', 'silk', 'sheer', 'underwear-as-outerwear', 'body reveal'],
  },

  {
    id: 'GARM-008',
    name: 'Trench Coat',
    category: 'outerwear',
    statement: 'Military utility. Heritage product. Fashion\'s most durable format.',
    culturalFunction:
      'The trench coat\'s fashion history runs through Burberry\'s utility heritage, Margiela\'s deconstruction (reversed linings, extended proportions), and Raf Simons\' youth-culture reframing. Its durability as a fashion format lies in its structural clarity — a belt, a collar, a placket — that each generation can re-read without exhausting it.',
    keyMoments: [
      {
        year: '1990s',
        description: 'Margiela reconstructs the trench: reversed, dismantled, re-assembled',
        eraId: '1990s',
      },
      {
        year: '2001–2004',
        description: 'Burberry Nova Check linings become a widely reproduced (and counterfeited) brand signifier',
        eraId: '2000s',
      },
      {
        year: '2010s',
        description: 'Oversized and deconstructed trench as recurring fashion week moment',
        eraId: '2010s',
      },
    ],
    brands: ['Burberry', 'Maison Margiela', 'Comme des Garçons', 'Acne Studios', 'Toteme'],
    sourceNotes: [],
    visualKeywords: ['double-breasted', 'belted', 'storm flap', 'epaulette', 'heritage beige', 'oversized silhouette'],
  },

  {
    id: 'GARM-009',
    name: 'Oversized Logo Sweatshirt / T-Shirt',
    category: 'jersey',
    statement: 'The brand\'s name, worn as the entire proposition.',
    culturalFunction:
      'From the Supreme Box Logo to Balenciaga\'s large-font logo garments, the oversized logo T-shirt and sweatshirt of the 2010s proposed the brand name — text only — as sufficient design content. This was both a reduction and an intensification: the garment contained nothing except its own brand signal, making it legible at a distance as a marker of cultural and financial access.',
    keyMoments: [
      {
        year: '1994–2010s',
        description: 'Supreme Box Logo tees: limited release, resale premium, brand-as-culture',
        eraId: '2010s',
      },
      {
        year: '2015–2019',
        description: 'Balenciaga, Vetements, Off-White produce oversized logo garments at luxury prices',
        eraId: '2010s',
      },
    ],
    brands: ['Supreme', 'Balenciaga', 'Off-White', 'Vetements', 'Gucci', 'Dior'],
    sourceNotes: [],
    visualKeywords: ['block text', 'box logo', 'jersey fabric', 'oversized', 'screen print', 'drop'],
  },

  {
    id: 'GARM-010',
    name: 'Quiet Coat — No-Logo Outerwear',
    category: 'outerwear',
    statement: 'The absence of the logo is the most expensive thing about it.',
    culturalFunction:
      'The "quiet coat" — cashmere overcoat, camel hair, unbranded or subtly branded — represents the anti-logo proposition as it matured in the 2020s. The Row\'s Maban coat, Toteme\'s structured wrap, Brunello Cucinelli\'s double cashmere — these garments signal through material and proportion rather than branding. They require the viewer to already know, which is itself a form of exclusion.',
    keyMoments: [
      {
        year: '2018–2022',
        description: 'The Row, Toteme, and Brunello Cucinelli establish "quiet coat" as desired category',
        eraId: '2020s',
        caseId: 'CASE-2020-004',
      },
    ],
    brands: ['The Row', 'Toteme', 'Brunello Cucinelli', 'Loro Piana', 'Philo'],
    sourceNotes: [],
    visualKeywords: ['camel', 'cashmere', 'no logo', 'structured drape', 'material quality', 'slow tailoring'],
  },
]

export function getGarmentById(id: string): Garment | undefined {
  return garments.find((g) => g.id === id)
}

export function getGarmentsByEra(eraId: string): Garment[] {
  return garments.filter((g) =>
    g.keyMoments.some((m) => m.eraId === eraId)
  )
}
