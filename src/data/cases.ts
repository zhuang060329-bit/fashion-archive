import type { Case } from './types'

// 案例資料：秀場 / campaign / icon look / 品牌時刻
// 每個 case 附 source notes
// 圖像策略：外部 URL 或純描述，不提交品牌圖片

export const cases: Case[] = [
  // ─── 1970s ───────────────────────────────────────────────────────
  {
    id: 'CASE-1970-001',
    eraId: '1970s',
    type: 'brand-moment',
    title: 'SEX Boutique — Westwood / McLaren',
    year: 1974,
    brand: 'Vivienne Westwood / Malcolm McLaren',
    designer: 'Vivienne Westwood',
    statement: 'Fashion as manifesto. The boutique itself was the collection.',
    context:
      'Malcolm McLaren and Vivienne Westwood opened SEX at 430 King\'s Road, Chelsea in 1974, having previously run Let It Rock (1971) and Too Fast to Live, Too Young to Die (1972) at the same location. SEX sold bondage trousers, ripped T-shirts with provocative imagery, rubber clothing, and fetish wear — reframing transgressive sexual aesthetics as street fashion. The boutique was later renamed Seditionaries (1976), then World\'s End (1980). Westwood\'s garments for the Sex Pistols — worn from the mid-1970s — established the visual grammar of British punk. The boutique operated as both retail space and cultural organ.',
    sourceNotes: [
      {
        claim: 'SEX boutique opened at 430 King\'s Road, Chelsea, 1974',
        source: 'Jon Savage, England\'s Dreaming (1991); V&A Museum records',
        year: 1974,
        confidence: 'verified',
      },
      {
        claim: 'Previous name Let It Rock (1971) at same location',
        source: 'Jon Savage, England\'s Dreaming; Vivienne Westwood: An Unfashionable Life (J. Mulvagh, 1998)',
        confidence: 'verified',
      },
    ],
    visualKeywords: ['bondage strap', 'ripped text', 'safety pin', 'rubber', 'hand-stamped', 'political'],
    imageRef: {
      description:
        'Storefront of 430 King\'s Road with pink SEX lettering; rubber and ripped garments on display. Interior with provocative graphic T-shirts.',
      type: 'placeholder',
    },
    tags: ['punk', 'anti-fashion', 'boutique', 'westwood', 'subculture'],
  },

  {
    id: 'CASE-1970-002',
    eraId: '1970s',
    type: 'brand-moment',
    title: 'Studio 54 — Halston\'s Clientele',
    year: 1977,
    brand: 'Halston',
    designer: 'Halston (Roy Halston Frowick)',
    statement: 'The nightclub as runway. The body as occasion.',
    context:
      'Studio 54 opened in New York City on April 26, 1977. Halston — who had designed Jackie Kennedy\'s pillbox hat for the 1961 inauguration and launched his own label in 1968 — became the defining designer of Studio 54\'s social landscape. His Ultrasuede shirtdress (introduced 1972) and bias-cut halter gowns dressed Liza Minnelli, Bianca Jagger, Marisa Berenson, and Andy Warhol\'s extended circle. The Studio 54 context collapsed the distinction between daywear and nightwear, socialite and celebrity — producing a new kind of dressing that was simultaneously effortless and spectacle. Halston later licensed his name to JCPenney in 1983, which ended his relationship with Bergdorf Goodman and began a commercial decline widely discussed in fashion history.',
    sourceNotes: [
      {
        claim: 'Studio 54 opened April 26, 1977 in New York City',
        source: 'Anthony Haden-Guest, The Last Party: Studio 54, Disco, and the Culture of the Night (1997)',
        year: 1977,
        confidence: 'verified',
      },
      {
        claim: 'Halston designed Jackie Kennedy\'s pillbox hat for 1961 inauguration',
        source: 'Multiple fashion history records; Bernadine Morris, New York Times coverage',
        year: 1961,
        confidence: 'verified',
      },
      {
        claim: 'Halston Ultrasuede shirtdress introduced 1972',
        source: 'Elsa Klensch, CNN Style; multiple fashion history records',
        year: 1972,
        confidence: 'widely-reported',
      },
    ],
    visualKeywords: ['sequin', 'bias cut', 'halter', 'ultra suede', 'disco globe', 'flash'],
    imageRef: {
      description:
        'Studio 54 interior with mirrored ball; Halston\'s silhouettes in fluid sequin and jersey. Bianca Jagger white dress entrance photograph.',
      type: 'placeholder',
    },
    tags: ['disco', 'Halston', 'Studio 54', 'NYC', 'celebrity', 'nightlife'],
  },

  {
    id: 'CASE-1970-003',
    eraId: '1970s',
    type: 'icon-look',
    title: 'Bianca Jagger — White Saint Laurent Suit, Studio 54 Birthday (1977)',
    year: 1977,
    brand: 'Yves Saint Laurent',
    designer: 'Yves Saint Laurent',
    subject: 'Bianca Jagger',
    statement: 'A suit worn by a woman rewrote what a suit could mean.',
    context:
      'Bianca Jagger\'s entrance at Studio 54 on a white horse for her 1977 birthday — wearing a white Saint Laurent tuxedo suit — is among the decade\'s most reproduced fashion images. Yves Saint Laurent had introduced Le Smoking, the women\'s tuxedo, in 1966 (Autumn/Winter 1966 collection); by the mid-1970s it had become a recurring element of his vocabulary and was available as both couture and Rive Gauche. Jagger\'s styling embodied the 1970s understanding that the tuxedo suit could simultaneously read as masculine uniform and transgressive femininity. The image circulated through the fashion and entertainment press, reinforcing the idea that a single look — worn by the right person, in the right room — could define a cultural moment.',
    sourceNotes: [
      {
        claim: 'YSL Le Smoking introduced 1966 (Autumn/Winter 1966 collection)',
        source: 'YSL Archives; Pierre Bergé statements; multiple fashion histories',
        year: 1966,
        confidence: 'verified',
      },
      {
        claim: 'Bianca Jagger Studio 54 birthday entrance on white horse, 1977',
        source: 'Widely photographed; Ron Galella archive; Studio 54 historical documentation',
        year: 1977,
        confidence: 'widely-reported',
        notes: 'Some accounts describe the horse as white; imagery is widely reproduced though exact outfit attribution sometimes varies',
      },
    ],
    visualKeywords: ['white tuxedo', 'androgyny', 'Rive Gauche', 'Le Smoking', 'event dressing'],
    imageRef: {
      description:
        'White equestrian entry; fitted Saint Laurent tuxedo suit, sculptural silhouette against disco atmosphere.',
      type: 'placeholder',
    },
    tags: ['YSL', 'androgyny', 'tuxedo', 'icon-look', 'Studio 54', '1970s'],
  },

  {
    id: 'CASE-1970-004',
    eraId: '1970s',
    type: 'cultural-collision',
    title: 'Kenzo Takada — Paris, 1970',
    year: 1970,
    brand: 'Kenzo',
    designer: 'Kenzo Takada',
    statement: 'Flat Japanese cutting enters the Paris atelier — the garment drapes past the body instead of carving it.',
    context:
      'Kenzo Takada arrived in Paris in 1965 and opened his first boutique, Jungle Jap, in 1970. His collections introduced bright pattern mixing, layering, and construction approaches that were rooted in Japanese textile traditions and non-European body understanding. His timing — alongside Issey Miyake\'s first Paris show in 1973 and Yohji Yamamoto and Rei Kawakubo\'s Paris debuts in 1981 — constituted a decade-long shift in what the Paris system could accommodate. Kenzo sold his label to LVMH in 1993.',
    sourceNotes: [
      {
        claim: 'Kenzo Takada opened Jungle Jap boutique in Paris, 1970',
        source: 'Kenzo brand history; multiple fashion histories including Dorothée Lalanne, Libération',
        year: 1970,
        confidence: 'verified',
      },
      {
        claim: 'Kenzo sold to LVMH 1993',
        source: 'LVMH corporate records; widely reported',
        year: 1993,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['pattern mix', 'layering', 'flat construction', 'botanical', 'colour block'],
    imageRef: {
      description:
        'Vibrant pattern mixing; flat-cut garments in bold floral prints; boutique Jungle Jap signage.',
      type: 'placeholder',
    },
    tags: ['Kenzo', 'Japanese influence', 'Paris', 'pattern', 'global fashion'],
  },

  // ─── 1980s ───────────────────────────────────────────────────────
  {
    id: 'CASE-1980-001',
    eraId: '1980s',
    type: 'campaign',
    title: '"Nothing comes between me and my Calvins" — Brooke Shields for Calvin Klein, 1980',
    year: 1980,
    brand: 'Calvin Klein',
    designer: 'Calvin Klein',
    subject: 'Brooke Shields',
    statement: 'A 15-year-old and a jeans ad. The body becomes the brand argument.',
    context:
      'Calvin Klein\'s 1980 jeans campaign, photographed by Richard Avedon with 15-year-old Brooke Shields, was banned by some US television networks and generated significant controversy. The tagline — "Nothing comes between me and my Calvins" — proposed the garment as intimate object, the celebrity body as guarantee. The campaign represented a shift in luxury marketing toward aspirational sexuality, and toward the use of celebrity (rather than model) as brand anchor. Calvin Klein\'s advertising under the creative direction of Sam Shahid continued to use provocative imagery through the decade.',
    sourceNotes: [
      {
        claim: 'Calvin Klein Brooke Shields campaign 1980, tagline "Nothing comes between me and my Calvins"',
        source: 'Advertising Age; New York Times; Richard Avedon Foundation archives',
        year: 1980,
        confidence: 'verified',
      },
      {
        claim: 'Campaign banned by some US television networks',
        source: 'New York Times coverage 1980; widely reported in advertising history',
        year: 1980,
        confidence: 'widely-reported',
      },
    ],
    visualKeywords: ['denim', 'body', 'close crop', 'high contrast black-and-white', 'provocative'],
    imageRef: {
      description:
        'Black-and-white portrait; denim emphasized on body; bold tagline typography. Richard Avedon composition.',
      type: 'placeholder',
    },
    tags: ['Calvin Klein', 'campaign', 'denim', 'celebrity', '1980s'],
  },

  {
    id: 'CASE-1980-002',
    eraId: '1980s',
    type: 'runway',
    title: 'Thierry Mugler — Architectural Power Silhouette, 1979–1984',
    year: '1979–1984',
    brand: 'Thierry Mugler',
    designer: 'Thierry Mugler',
    statement: 'The shoulder as architecture. The body as machine.',
    context:
      'Thierry Mugler\'s collections through the late 1970s and 1980s developed an extreme vocabulary of structured shoulders, cinched waists, and theatrical silhouettes that referenced science fiction, superhero imagery, and automotive design. His runway shows were theatrical events with elaborate staging. Grace Jones\'s performances and appearances in Mugler were among the decade\'s defining fashion-culture overlaps. Claude Montana developed a parallel and equally exaggerated shoulder vocabulary in leather and suede. Together they made the padded shoulder the visual signature of 1980s power dressing — though Giorgio Armani\'s unstructured suit proposed a different, less theatrical version of professional authority.',
    sourceNotes: [
      {
        claim: 'Thierry Mugler known for extreme architectural silhouettes through late 1970s and 1980s',
        source: 'Vogue archives; retrospective at Palais Galliera, 2021',
        confidence: 'verified',
      },
    ],
    visualKeywords: ['padded shoulder', 'architectural', 'waist cinch', 'structured', 'theatrical', 'chrome'],
    imageRef: {
      description:
        'Extreme shoulder construction; robot-like bodycon silhouette; theatrical show atmosphere with dramatic lighting.',
      type: 'placeholder',
    },
    tags: ['Mugler', 'power dressing', 'shoulder', 'theatrical', '1980s'],
  },

  {
    id: 'CASE-1980-003',
    eraId: '1980s',
    type: 'brand-moment',
    title: 'Karl Lagerfeld at Chanel — Reviving the Codes, from 1983',
    year: 1983,
    brand: 'Chanel',
    designer: 'Karl Lagerfeld',
    statement: 'The quilt, the gilt chain, the interlocked CC — Lagerfeld kept the parts and made the initials the product.',
    context:
      'Karl Lagerfeld was appointed Chanel\'s creative director in 1983, following years in which the house had operated with diminishing fashion authority after Coco Chanel\'s death in 1971. Lagerfeld worked with and expanded Chanel\'s inherited visual language: the interlocking CC, the gilt chain, the bouclé tweed, the quilted leather. The "Classic Flap" bag — featuring the CC turn-lock closure Lagerfeld developed — became distinct from the original 2.55 (introduced by Coco Chanel in February 1955, named for that month and year). By the late 1980s, the CC logo had become one of fashion\'s most legible symbols. Lagerfeld simultaneously designed for Fendi and Chloé while at Chanel, an arrangement unusual in the industry.',
    sourceNotes: [
      {
        claim: 'Lagerfeld appointed Chanel creative director 1983',
        source: 'Chanel corporate records; Justine Picardie, Coco Chanel (biography)',
        year: 1983,
        confidence: 'verified',
      },
      {
        claim: 'Original 2.55 introduced February 1955 by Coco Chanel',
        source: 'Chanel brand archives',
        year: 1955,
        confidence: 'verified',
        notes: 'Named for February (month) 1955 (year); the Classic Flap with CC closure is Lagerfeld\'s subsequent development',
      },
    ],
    visualKeywords: ['CC logo', 'quilted leather', 'gilt chain', 'bouclé', 'interlocking', 'Parisian codes'],
    imageRef: {
      description:
        'Quilted leather handbag with CC closure; bouclé suit in ivory; iconic chain strap. Fashion show setting with white runway.',
      type: 'placeholder',
    },
    tags: ['Chanel', 'Lagerfeld', 'logo', 'heritage', '1980s'],
  },

  {
    id: 'CASE-1980-004',
    eraId: '1980s',
    type: 'garment-debut',
    title: 'Nike Air Max 1 — 1987',
    year: 1987,
    brand: 'Nike',
    designer: 'Tinker Hatfield',
    statement: 'A window cut into a sole. The interior becomes the display.',
    context:
      'The Nike Air Max 1, designed by Tinker Hatfield and released in 1987, introduced a visible Air cushioning unit — a transparent window in the midsole that displayed the air pocket inside. The design was reportedly inspired by the Centre Georges Pompidou in Paris, where structural systems are displayed on the building\'s exterior. The Air Max 1 initiated the "visible Air" era and inaugurated a new relationship between athletic performance technology and fashion aesthetics. It became the founding object of sneaker collecting culture as it developed through the following decades.',
    sourceNotes: [
      {
        claim: 'Nike Air Max 1 released 1987, designed by Tinker Hatfield',
        source: 'Nike corporate archives; Tinker Hatfield interviews; Sneaker Freaker',
        year: 1987,
        confidence: 'verified',
      },
      {
        claim: 'Design inspired by Centre Georges Pompidou',
        source: 'Tinker Hatfield interviews; widely reported in design and sneaker press',
        confidence: 'widely-reported',
        notes: 'Hatfield has stated this influence in multiple interviews',
      },
    ],
    visualKeywords: ['visible Air', 'midsole window', 'athletic technology', 'cross-section', 'grey-red-white'],
    imageRef: {
      description:
        'Side profile of Air Max 1; visible cushioning window in midsole; original 1987 colorway (grey/red/white).',
      type: 'placeholder',
    },
    tags: ['Nike', 'sneaker', 'athletic', 'design', '1980s'],
  },

  // ─── 1990s ───────────────────────────────────────────────────────
  {
    id: 'CASE-1990-001',
    eraId: '1990s',
    type: 'runway',
    title: 'Maison Margiela — First Collection, Paris, October 1988',
    year: 1988,
    brand: 'Maison Margiela',
    designer: 'Martin Margiela',
    statement: 'No logo. No faces. An address where a collection should be.',
    context:
      'Martin Margiela\'s first collection was presented at Chez Régine in Paris in October 1988, for the Fall/Winter 1988–89 season. The collection introduced the Tabi boot — a split-toe shoe referencing Japanese Tabi socks — and a label that named no designer, only a series of numbers. Models\' faces were obscured or turned away from cameras. The show took place in a working-class neighbourhood, chairs were improvised, and the collection was entirely white or pale. It established a systematic deconstruction of fashion\'s conventions — anonymity, anti-spectacle, construction visible in the finished garment — that would define the house for the following decades. Margiela was appointed creative director of Hermès women\'s prêt-à-porter in 1997, serving until 2003.',
    sourceNotes: [
      {
        claim: 'Martin Margiela first collection shown October 1988, Paris (for Fall/Winter 1988–89)',
        source: 'Debo Broersen & Michiel Scheffer, Martin Margiela (2009, Rizzoli); Deyan Sudjic, Rei Kawakubo and Comme des Garçons (1990)',
        year: 1988,
        confidence: 'verified',
      },
      {
        claim: 'Tabi boot debuted at first collection 1988',
        source: 'Maison Margiela brand documentation; widely cited in fashion histories',
        year: 1988,
        confidence: 'verified',
      },
      {
        claim: 'Margiela appointed Hermès creative director 1997, until 2003',
        source: 'Hermès corporate records; widely reported',
        year: 1997,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['white', 'split toe', 'anonymous label', 'deconstructed seam', 'bare staging', 'reverse lining'],
    imageRef: {
      description:
        'White garments with exposed construction; Tabi boot profile; empty numbered label sewn with four white stitches.',
      type: 'placeholder',
    },
    tags: ['Margiela', 'deconstruction', 'anonymity', 'Tabi', '1990s'],
  },

  {
    id: 'CASE-1990-002',
    eraId: '1990s',
    type: 'runway',
    title: 'Marc Jacobs for Perry Ellis — Spring/Summer 1993 "Grunge" Collection',
    year: 1993,
    brand: 'Perry Ellis',
    designer: 'Marc Jacobs',
    statement: 'The wrong music, made into a collection. He was fired for it.',
    context:
      'Marc Jacobs, then creative director at Perry Ellis, presented a Spring/Summer 1993 collection that translated grunge aesthetic — layered flannels, knit caps, silk slip dresses over thermal underwear — into luxury ready-to-wear. The collection was widely covered but commercially rejected; Jacobs was dismissed from Perry Ellis shortly after. The collection has since been recontextualized as ahead of its moment. Jacobs launched his own label in 1993 and was appointed Louis Vuitton artistic director in 1997, a position he held until 2013. The Perry Ellis collection is a recurring reference in discussions of fashion\'s relationship to subcultural authenticity.',
    sourceNotes: [
      {
        claim: 'Marc Jacobs showed grunge-influenced collection for Perry Ellis Spring/Summer 1993 and was fired',
        source: 'New York Times fashion coverage 1993; WWD; Marc Jacobs interviews; André Leon Talley, The Chiffon Trenches (2020)',
        year: 1993,
        confidence: 'verified',
      },
      {
        claim: 'Jacobs appointed Louis Vuitton artistic director 1997',
        source: 'Louis Vuitton corporate records; widely reported',
        year: 1997,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['flannel', 'knit cap', 'slip dress over thermal', 'layering', 'luxury-grunge'],
    imageRef: {
      description:
        'Runway photo of luxury grunge layering; silk slip over thermal long-sleeve; model in knit beanie. Perry Ellis showroom light.',
      type: 'placeholder',
    },
    tags: ['Marc Jacobs', 'grunge', 'Perry Ellis', 'subculture', '1990s'],
  },

  {
    id: 'CASE-1990-003',
    eraId: '1990s',
    type: 'runway',
    title: 'Comme des Garçons — Body Meets Dress, Dress Meets Body, Spring/Summer 1997',
    year: 1997,
    brand: 'Comme des Garçons',
    designer: 'Rei Kawakubo',
    statement: 'Gingham padding swells at hip and shoulder — the dress refuses the body fashion assumes.',
    context:
      'Rei Kawakubo\'s Spring/Summer 1997 Comme des Garçons collection presented garments with internal padding that created bulges and protrusions — humps, swellings, asymmetrical growths — at unexpected points on the body. The collection refused the normative body the fashion garment typically presupposes and was received with confusion and hostility by some critics. It has since become a canonical example of fashion as conceptual proposition. The garments were made in gingham fabric, a domestic and humble pattern that amplified the strangeness of the silhouette. The collection is a standard reference in academic fashion studies.',
    sourceNotes: [
      {
        claim: 'Comme des Garçons "Body Meets Dress, Dress Meets Body" Spring/Summer 1997',
        source: 'CdG show records; extensively reviewed in Vogue, i-D, The Face; discussed in Joanne Entwistle, The Fashioned Body (2000)',
        year: 1997,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['gingham', 'padded protrusion', 'asymmetric body', 'conceptual', 'domestic distortion'],
    imageRef: {
      description:
        'Gingham fabric with pronounced internal padding at shoulder and hip; distorted silhouette against white runway.',
      type: 'placeholder',
    },
    tags: ['CdG', 'Kawakubo', 'conceptual', 'body', '1990s'],
  },

  {
    id: 'CASE-1990-004',
    eraId: '1990s',
    type: 'brand-moment',
    title: 'Tom Ford at Gucci — Fall 1995',
    year: 1995,
    brand: 'Gucci',
    designer: 'Tom Ford',
    statement: 'Velvet hipster flares, an open satin shirt — Gucci sells the low cut as the comeback.',
    context:
      'Tom Ford was appointed Gucci\'s creative director in 1994, joining a house that had been commercially troubled through the late 1980s and early 1990s. His Fall/Winter 1995 collection — often cited as Gucci\'s comeback moment — featured velvet hipster flares, satin shirts, precision tailoring, and an explicit sexuality that departed radically from the brand\'s previous direction. The show is widely considered one of the decade\'s most influential. Ford remained at Gucci until 2004, simultaneously creative directing Yves Saint Laurent (acquired by Gucci Group in 1999). He launched his own brand, Tom Ford, in 2005.',
    sourceNotes: [
      {
        claim: 'Tom Ford appointed Gucci creative director 1994',
        source: 'Gucci corporate records; Tom Ford autobiography',
        year: 1994,
        confidence: 'verified',
      },
      {
        claim: 'Fall/Winter 1995 collection widely cited as Gucci revival moment',
        source: 'Vogue, WWD reviews 1995; Hamish Bowles coverage; multiple fashion histories',
        year: 1995,
        confidence: 'widely-reported',
      },
    ],
    visualKeywords: ['velvet', 'hipster flare', 'satin shirt', 'low cut', 'precision tailoring', 'sexual confidence'],
    imageRef: {
      description:
        'Velvet hipster flare trousers with satin shirt; deep neckline; model in strappy heel. Gucci hardware visible.',
      type: 'placeholder',
    },
    tags: ['Gucci', 'Tom Ford', 'revival', 'seduction', '1990s'],
  },

  // ─── 2000s ───────────────────────────────────────────────────────
  {
    id: 'CASE-2000-001',
    eraId: '2000s',
    type: 'garment-debut',
    title: 'Balenciaga City Bag — Nicolas Ghesquière, 2001',
    year: 2001,
    brand: 'Balenciaga',
    designer: 'Nicolas Ghesquière',
    statement: 'A bag as decade. You know the year from the hardware.',
    context:
      'The Balenciaga Motorcycle bag (also known as the City bag or Lariat) was introduced in Balenciaga\'s Fall 2001 collection under Nicolas Ghesquière\'s creative direction. Its distressed lambskin leather, oversized zippers, silver hardware, and fringed straps proposed a different luxury vocabulary from the logo-centric bags that dominated the market. It became widely carried by celebrities and was photographed extensively through the mid-2000s paparazzi era — Kate Moss, Lindsay Lohan, Nicole Richie, and Sienna Miller among others. The bag\'s market penetration demonstrated that celebrity endorsement (unpaid, through actual use) could replace advertising.',
    sourceNotes: [
      {
        claim: 'Balenciaga City/Motorcycle bag introduced in Fall 2001 collection by Ghesquière',
        source: 'Balenciaga brand history; collection season reported as SS2001 or FW2001 across sources',
        year: 2001,
        confidence: 'widely-reported',
        notes: 'Season attribution varies slightly across sources; 2001 year is consistent',
      },
    ],
    visualKeywords: ['distressed lambskin', 'oversized zipper', 'silver hardware', 'fringe strap', 'worn-in'],
    imageRef: {
      description:
        'Balenciaga City bag in distressed leather; oversized silver zippers; moto-strap details. Carried at street level, paparazzi format.',
      type: 'placeholder',
    },
    tags: ['Balenciaga', 'It bag', 'Ghesquière', 'celebrity', '2000s'],
  },

  {
    id: 'CASE-2000-002',
    eraId: '2000s',
    type: 'brand-moment',
    title: 'Louis Vuitton × Takashi Murakami — Monogram Multicolore, 2003',
    year: 2003,
    brand: 'Louis Vuitton',
    designer: 'Marc Jacobs × Takashi Murakami',
    statement: 'The monogram updated. Art as brand maintenance.',
    context:
      'The Louis Vuitton × Takashi Murakami collaboration — the Monogram Multicolore — was introduced in 2003, during Marc Jacobs\' tenure as LV\'s artistic director. Murakami\'s superflat aesthetic transformed the classic LV monogram into a 33-color pattern on white or black canvas. The collaboration was one of the decade\'s most commercially successful luxury projects and established the artist-collaboration format as a standard tool in luxury brand strategy. A second collaboration, the Cherry Blossom pattern, preceded it in 2003. Murakami and LV would continue collaborating through 2015.',
    sourceNotes: [
      {
        claim: 'Louis Vuitton × Takashi Murakami Monogram Multicolore introduced 2003',
        source: 'Louis Vuitton brand records; Takashi Murakami artist records',
        year: 2003,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['33-color monogram', 'white canvas', 'cherry blossom', 'superflat', 'logo maximalism'],
    imageRef: {
      description:
        'Multicolore LV monogram on white Speedy bag; Murakami cartoon motifs alongside classic LV pattern.',
      type: 'placeholder',
    },
    tags: ['Louis Vuitton', 'Murakami', 'collaboration', 'monogram', '2000s'],
  },

  {
    id: 'CASE-2000-003',
    eraId: '2000s',
    type: 'brand-moment',
    title: 'H&M × Karl Lagerfeld — November 2004',
    year: 2004,
    brand: 'H&M',
    designer: 'Karl Lagerfeld',
    statement: 'The format changes. Luxury becomes a template.',
    context:
      'H&M\'s collaboration with Karl Lagerfeld in November 2004 was the first major instance of a luxury fashion designer releasing a collection through a mass-market fast fashion retailer. The collection sold out within hours in most markets and established a commercially viable format — designer × fast fashion — that H&M and competitors replicated repeatedly: Stella McCartney (2005), Viktor & Rolf (2006), Roberto Cavalli (2007), Comme des Garçons (2008). The collaboration\'s success demonstrated that the designer\'s name — as sign — could generate demand independently of price point or material quality.',
    sourceNotes: [
      {
        claim: 'H&M × Karl Lagerfeld collaboration, November 2004',
        source: 'H&M press records; Karl Lagerfeld interviews',
        year: 2004,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['mass market', 'designer name', 'crowd queuing', 'simplified version', 'accessible luxury'],
    imageRef: {
      description:
        'H&M storefront with Lagerfeld name signage; simplified luxury tailoring at fast fashion price; queue of consumers.',
      type: 'placeholder',
    },
    tags: ['H&M', 'Lagerfeld', 'collab', 'fast fashion', '2000s'],
  },

  {
    id: 'CASE-2000-004',
    eraId: '2000s',
    type: 'cultural-collision',
    title: 'The Rachel Zoe Moment — Celebrity Styling as Trend Engine, c.2004–2007',
    year: 'c.2004–2007',
    subject: 'Rachel Zoe',
    statement: 'The stylist becomes the industry. The client becomes the product.',
    context:
      'Rachel Zoe emerged as a defining celebrity stylist in the mid-2000s, with clients including Nicole Richie, Lindsay Lohan, Mischa Barton, and Cameron Diaz. The "Zoe Effect" — her ability to propel a garment or accessory into mainstream desirability through celebrity placement — was widely discussed in fashion and entertainment press. Her aesthetic (oversized sunglasses, bohemian layers, oversized tote bags, high platform heels) entered popular culture through celebrity coverage in People, US Weekly, and the emerging fashion blog ecosystem. Zoe represented a structural shift: the stylist, rather than the designer or the fashion editor, as the primary driver of what people wore.',
    sourceNotes: [
      {
        claim: 'Rachel Zoe described in fashion press as having a "Zoe Effect" on trends, c.2005–2007',
        source: 'New York Times, Vogue, InStyle coverage',
        confidence: 'widely-reported',
      },
    ],
    visualKeywords: ['oversized sunglasses', 'boho layers', 'platform heel', 'oversized tote', 'celebrity street'],
    imageRef: {
      description:
        'Celebrity styled in oversized vintage-inspired look; enormous sunglasses; layered boho silhouette. Paparazzi format.',
      type: 'placeholder',
    },
    tags: ['celebrity styling', 'Rachel Zoe', 'influencer precursor', '2000s'],
  },

  // ─── 2010s ───────────────────────────────────────────────────────
  {
    id: 'CASE-2010-001',
    eraId: '2010s',
    type: 'brand-moment',
    title: 'Vetements — DHL T-Shirt, Fall/Winter 2016',
    year: 2016,
    brand: 'Vetements',
    designer: 'Demna Gvasalia',
    statement: 'A logistics company\'s shirt. €185. The joke holds.',
    context:
      'Vetements presented a DHL-logoed T-shirt in its Fall/Winter 2016 collection, priced at €185. The shirt — identical in design to DHL\'s actual employee uniform — became a widely discussed object: simultaneously an ironic commentary on fashion\'s relationship to consumer culture and a commercially successful luxury garment. It was bought and worn seriously, which was either the punchline or the point. Demna Gvasalia co-founded Vetements with his brother Guram in 2014 and was simultaneously appointed Balenciaga creative director in October 2015. The DHL T-shirt became a symbol of a specific moment in fashion\'s negotiation between irony, commerce, and conceptual proposition.',
    sourceNotes: [
      {
        claim: 'Vetements DHL T-shirt shown Fall/Winter 2016, priced at €185',
        source: 'WWD, Vogue, Business of Fashion coverage of Vetements FW16',
        year: 2016,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['DHL yellow-red', 'logistics logo', 'irony', 'plain T-shirt', 'uniform-as-luxury'],
    imageRef: {
      description: 'Yellow DHL T-shirt with red logo; model styled in oversized fit; clean white background.',
      type: 'placeholder',
    },
    tags: ['Vetements', 'Demna', 'irony', 'logo', '2010s'],
  },

  {
    id: 'CASE-2010-002',
    eraId: '2010s',
    type: 'brand-moment',
    title: 'Supreme × Louis Vuitton — Men\'s Spring/Summer 2017, Paris',
    year: 2017,
    brand: 'Supreme × Louis Vuitton',
    designer: 'Kim Jones × James Jebbia',
    statement: 'Two logos share a surface. The hierarchy finalizes its collapse.',
    context:
      'The Supreme × Louis Vuitton collaboration was presented at Louis Vuitton\'s Men\'s Spring/Summer 2017 show in Paris in January 2017, during Kim Jones\' tenure as Men\'s artistic director (2011–2018). The collection placed the LV Monogram and Supreme\'s Box Logo on the same objects: trunks, bags, accessories, and ready-to-wear. It became one of the most covered fashion collaborations of the decade, with Supreme-branded LV pieces selling at significant secondary market premiums. Supreme was founded in 1994 by James Jebbia. The collaboration formally institutionalized the streetwear × luxury merger that had been developing through the decade.',
    sourceNotes: [
      {
        claim: 'Supreme × LV Men\'s SS2017 shown January 2017 in Paris',
        source: 'Louis Vuitton press; Supreme press',
        year: 2017,
        confidence: 'verified',
      },
      {
        claim: 'Supreme founded 1994 by James Jebbia, New York City',
        source: 'Supreme brand records; widely documented',
        year: 1994,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['box logo', 'LV monogram', 'shared surface', 'limited collab', 'streetwear × heritage'],
    imageRef: {
      description:
        'LV monogram with Supreme Box Logo on trunk / bag surface; runway show setting; dual brand identity on same object.',
      type: 'placeholder',
    },
    tags: ['Supreme', 'Louis Vuitton', 'collaboration', 'streetwear', '2010s'],
  },

  {
    id: 'CASE-2010-003',
    eraId: '2010s',
    type: 'garment-debut',
    title: 'Balenciaga Triple S — Spring 2017',
    year: 2017,
    brand: 'Balenciaga',
    designer: 'Demna Gvasalia',
    statement: 'The ugly sneaker. It sells. The category resolves.',
    context:
      'The Balenciaga Triple S, introduced in the brand\'s Spring 2017 collection under Demna Gvasalia, combined multiple sole units layered over each other into an exaggerated "dad sneaker" silhouette. Its deliberate awkwardness — heavy, chunky, anti-athletic — reframed ugliness as luxury aesthetics. Priced at approximately $850 at introduction, it generated a waiting list and significant secondary market activity. The Triple S established the "ugly sneaker" as a luxury product category and influenced the design direction of competing brands. Its popularity peaked approximately 2018–2019.',
    sourceNotes: [
      {
        claim: 'Balenciaga Triple S introduced Spring 2017 collection',
        source: 'Balenciaga brand records; sneaker and fashion press',
        year: 2017,
        confidence: 'widely-reported',
      },
    ],
    visualKeywords: ['multi-sole stack', 'chunky', 'dad sneaker', 'exaggerated volume', 'luxury ugly'],
    imageRef: {
      description: 'Balenciaga Triple S profile; stacked multi-unit sole; heavy silhouette in white and grey.',
      type: 'placeholder',
    },
    tags: ['Balenciaga', 'sneaker', 'Triple S', 'ugly sneaker', '2010s'],
  },

  {
    id: 'CASE-2010-004',
    eraId: '2010s',
    type: 'brand-moment',
    title: 'Off-White × Nike "The Ten" — September 2017',
    year: 2017,
    brand: 'Off-White × Nike',
    designer: 'Virgil Abloh',
    statement: 'Ten silhouettes. Deconstructed. "Off-White™ c/o Virgil Abloh™"',
    context:
      'Virgil Abloh\'s Off-White × Nike collaboration "The Ten" (September 2017) redesigned ten iconic Nike silhouettes — including the Air Jordan 1, Air Force 1, Blazer, Air Presto, Air Max 90, Air Max 97, Zoom Vaporfly, React Hyperdunk, Chuck Taylor, and UltraFlight — exposing construction details, adding industrial strapping, and placing Abloh\'s signature text and quotation marks on each. The project was framed as a deconstruction exercise: highlighting what the original shoe contained. The Air Jordan 1 "Chicago" from the collaboration became one of the most valuable sneakers on the secondary market. Abloh was appointed LV Men\'s creative director in March 2018 and died in November 2021.',
    sourceNotes: [
      {
        claim: 'Off-White × Nike "The Ten" collaboration, September 2017',
        source: 'Nike press; Off-White press; sneaker and fashion press coverage',
        year: 2017,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['exposed construction', 'quotation marks', 'industrial strap', 'air unit', 'text on object'],
    imageRef: {
      description:
        'Air Jordan 1 with Off-White "AIR" text and zip tie; deconstructed stitch detail; industrial branding on white leather.',
      type: 'placeholder',
    },
    tags: ['Off-White', 'Nike', 'Virgil Abloh', 'sneaker', '2010s'],
  },

  // ─── 2020s ───────────────────────────────────────────────────────
  {
    id: 'CASE-2020-001',
    eraId: '2020s',
    type: 'icon-look',
    title: 'Harry Styles — British Vogue, December 2020',
    year: 2020,
    brand: 'Gucci',
    subject: 'Harry Styles',
    statement: 'A man in a gown on a magazine cover. The conversation arrives at the newsstand.',
    context:
      'Harry Styles appeared on the cover of British Vogue\'s December 2020 issue — the first solo male cover in the magazine\'s history — wearing Gucci, photographed by Tyler Mitchell. The images showed Styles in lace, ruffles, frocks, and mixed gender-coded garments, styled by Camilla Nickerson. The cover generated significant media coverage across fashion and general press, with discussions centering on gender presentation in fashion and the role of celebrity in shifting mainstream attitudes. Styles had appeared in gender-fluid styling in fashion contexts previously; the Vogue cover placed it in the context of a centenary fashion institution.',
    sourceNotes: [
      {
        claim: 'Harry Styles British Vogue December 2020 cover; first solo male cover in magazine history',
        source: 'British Vogue, December 2020',
        year: 2020,
        confidence: 'verified',
        notes: 'Photographed by Tyler Mitchell; styled by Camilla Nickerson',
      },
    ],
    visualKeywords: ['lace', 'ruffle', 'mixed gender-coding', 'Gucci', 'magazine cover', 'solo male'],
    imageRef: {
      description:
        'Magazine cover; male subject in Gucci lace and ruffle garments; mixed gender-coded styling. British Vogue masthead.',
      type: 'placeholder',
    },
    tags: ['Harry Styles', 'gender-fluid', 'Gucci', 'Vogue', '2020s'],
  },

  {
    id: 'CASE-2020-002',
    eraId: '2020s',
    type: 'runway',
    title: 'Miu Miu Spring/Summer 2022 — Micro-Mini Moment',
    year: 2021,
    brand: 'Miu Miu',
    designer: 'Miuccia Prada',
    statement: 'The waistband sits above the belly button. Below: almost nothing.',
    context:
      'Miu Miu\'s Spring/Summer 2022 collection, shown in Paris in October 2021, presented a series of ultra-micro pleated skirts worn at the natural waist or higher, paired with cropped knitwear and academic accessories. The micro-mini skirt became a widely discussed fashion moment across editorial coverage, social media, and street style in 2022. It was widely interpreted as a reclamation of 1960s minimalism and bodily freedom — though the collection\'s broader context was more complex, addressing youth, innocence, and the relationship between institutional dressing and exposure. Multiple contemporary models and cultural figures were photographed in Miu Miu micro skirts throughout 2022.',
    sourceNotes: [
      {
        claim: 'Miu Miu SS2022 shown Paris October 2021; micro-mini skirt widely discussed',
        source: 'Vogue Runway, WWD, BoF coverage October 2021; fashion editorial coverage 2022',
        year: 2021,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['micro-mini', 'pleated', 'high waist', 'academic knit', 'tan leather accessory', 'exposure'],
    imageRef: {
      description:
        'Ultra-micro pleated skirt at natural waist; cropped wool knit top; loafer and high sock. Miu Miu runway Paris.',
      type: 'placeholder',
    },
    tags: ['Miu Miu', 'micro-mini', 'Miuccia', 'runway', '2020s'],
  },

  {
    id: 'CASE-2020-003',
    eraId: '2020s',
    type: 'brand-moment',
    title: 'Phoebe Philo Returns — Philo Brand, October 2023',
    year: 2023,
    brand: 'Philo',
    designer: 'Phoebe Philo',
    statement: 'Five years\' absence. The waiting list formed before the first look.',
    context:
      'Phoebe Philo served as creative director of Celine from 2008 to 2018, during which the brand became a reference point for intellectual feminism in fashion, quiet luxury, and anti-logo dressing. Her departure in 2018 was widely reported and discussed. Her announcement that she would establish a new independent brand — with LVMH as minority investor — generated significant anticipation. The first collection was released directly via philo.com in October 2023, with pieces priced at substantial luxury levels and no wholesale distribution. The "old Celine" aesthetic had developed a significant secondary market and collector base in the years between her departure and the new brand\'s launch.',
    sourceNotes: [
      {
        claim: 'Phoebe Philo at Celine 2008–2018',
        source: 'Celine corporate records',
        confidence: 'verified',
      },
      {
        claim: 'Philo brand first collection drop October 2023',
        source: 'Philo press release; widely reported in fashion press October 2023',
        year: 2023,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['anti-logo', 'intellectual tailoring', 'quiet colour', 'deliberate proportion', 'no wholesale'],
    imageRef: {
      description:
        'Precise tailoring in muted tone; architectural proportion; minimal branding. Direct-to-consumer presentation format.',
      type: 'placeholder',
    },
    tags: ['Phoebe Philo', 'Celine', 'quiet luxury', 'return', '2020s'],
  },

  {
    id: 'CASE-2020-004',
    eraId: '2020s',
    type: 'cultural-collision',
    title: 'Quiet Luxury and the Succession Effect, c.2022–2023',
    year: 'c.2022–2023',
    statement: 'No logo. No noise. The most expensive thing in the room identifies itself by not trying.',
    context:
      'The term "quiet luxury" circulated widely in fashion media from approximately 2022, describing dressing characterized by material quality, muted palette, precise tailoring, and the absence of visible logos. Key reference brands included The Row, Toteme, Brunello Cucinelli, and Loro Piana. The aesthetic was associated in press coverage with the costume design of HBO\'s Succession (costume designer: Michelle Matland), which dressed its ultra-wealthy characters in understated but expensive garments. The Row — founded by Mary-Kate and Ashley Olsen in 2006 — became the most frequently cited quiet luxury reference; its pieces circulated heavily in fashion editorial and social media. The trend existed in tension with the continued visibility of logo-heavy streetwear.',
    sourceNotes: [
      {
        claim: '"Quiet luxury" widely circulated in fashion media from c.2022',
        source: 'BoF, Vogue, New York Times trend reporting 2022–2023',
        year: 2022,
        confidence: 'widely-reported',
        notes: 'Term origin is journalistic; Succession costume design connection widely noted but is an editorial association, not official statement',
      },
      {
        claim: 'The Row founded by Mary-Kate and Ashley Olsen, 2006',
        source: 'The Row brand history; multiple fashion records',
        year: 2006,
        confidence: 'verified',
      },
    ],
    visualKeywords: ['cashmere', 'muted palette', 'no logo', 'precision cut', 'stealth wealth', 'The Row'],
    imageRef: {
      description:
        'Understated tailoring in camel / grey / ivory; no visible branding; material-forward photography. Editorial format.',
      type: 'placeholder',
    },
    tags: ['quiet luxury', 'The Row', 'stealth wealth', 'Succession', '2020s'],
  },
]

export function getCaseById(id: string): Case | undefined {
  return cases.find((c) => c.id === id)
}

export function getCasesByEra(eraId: string): Case[] {
  return cases.filter((c) => c.eraId === eraId)
}
