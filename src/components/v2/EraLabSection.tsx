'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getCasesByEra } from '@/data/cases'
import { MaterialSpecimenCard } from '@/components/v2/MaterialSpecimenCard'
import { SpecimenRuler } from '@/components/v2/SpecimenRuler'
import { SpecimenStamp } from '@/components/v2/SpecimenStamp'
import { MisregisteredText } from '@/components/v2/MisregisteredText'
import { getCaseSpecimenState } from '@/lib/specimenState'
import { SourceMarker } from '@/components/SourceMarker'
import {
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
} from '@/components/motion-primitives/disclosure'
import type { Era } from '@/data/types'

export type LabVariant = 'contrast-grid' | 'signal-stack'

interface EraLabSectionProps {
  era: Era
  variant: LabVariant
}

const MAX_CASES = 4
// 1970s 用：每張卡片的固定旋轉角度，模擬手工釘上 pin board 時的不對齊
const PIN_ROTATIONS = [-1.6, 1.1, -0.7, 1.8]

// 兩個 prototype 視覺語言，刻意不同 template：
// - contrast-grid（1970s）：不對稱兩欄，左側 raw textured 色塊用
//   clip-path 做不規則撕邊，右側 specimen 卡片以圖釘 + 紙標籤 + 套印錯位
//   文字呈現 DIY pin-board / zine 感，每張卡固定角度傾斜製造手工不對齊
// - signal-stack（2010s）：卡片用負 margin 疊放錯位，大字編號像
//   logo/球鞋吊牌，accent 是 signal red，疊加 terminal 風格 timestamp/
//   drop-queue 標記與抽象訊號密度條，呼應 platform-era feed 密度
export function EraLabSection({ era, variant }: EraLabSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const cases = getCasesByEra(era.id).slice(0, MAX_CASES)
  const accentColor = era.colorProfile.accent ?? 'var(--color-archive-400)'

  useGSAP(
    () => {
      if (prefersReduced) return

      gsap.from('.lab-board-meta', {
        opacity: 0,
        y: 14,
        duration: 0.6,
        stagger: 0.06,
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      })

      gsap.from('.lab-board-fragment', {
        opacity: 0,
        y: variant === 'signal-stack' ? 28 : 18,
        rotateZ: variant === 'signal-stack' ? -2 : 0,
        duration: 0.7,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 72%' },
      })
    },
    { scope: containerRef, dependencies: [prefersReduced, era.id, variant] },
  )

  return (
    <section
      ref={containerRef}
      id={`era-lab-${era.id}`}
      className="relative px-6 py-20 md:px-10 md:py-28"
      style={{ '--era-accent': accentColor, borderTop: '1px solid var(--line-color)' } as React.CSSProperties}
      aria-label={`Material board: ${era.period}`}
    >
      {/* pattern-cutting guide 浮水印——非裝飾性漸層，是「縫紙樣格線」語彙 */}
      <div className="lab-cutting-guide" aria-hidden="true" />

      <div className="relative z-10">
        <div className="lab-board-meta mb-4 flex items-baseline gap-6">
          <span className="type-mono-xs" style={{ color: 'var(--era-accent)' }}>
            {era.caseIndex}
          </span>
          <span className="type-mono-sm">{era.period}</span>
          <span className="type-mono-xs" style={{ color: 'var(--color-archive-600)' }}>
            BOARD TYPE: {variant === 'contrast-grid' ? 'MATERIAL CONTRAST' : 'SIGNAL STACK'}
          </span>
        </div>

        <SpecimenRuler ticks={20} className="lab-board-meta mb-10 max-w-md" />

        <h2 className="lab-board-meta type-chapter mb-3" style={{ maxWidth: '40rem' }}>
          {era.title}
        </h2>
        <p className="lab-board-meta type-statement mb-12" style={{ maxWidth: '32rem' }}>
          {era.statement}
        </p>

        {variant === 'contrast-grid' ? (
          <ContrastGridBoard era={era} cases={cases} accentColor={accentColor} />
        ) : (
          <SignalStackBoard cases={cases} accentColor={accentColor} />
        )}
      </div>
    </section>
  )
}

/* ── CONTRAST GRID — 1970s ───────────────────────────────────── */

function ContrastGridBoard({
  era,
  cases,
  accentColor,
}: { era: Era; cases: ReturnType<typeof getCasesByEra>; accentColor: string }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const hasActive = activeId !== null

  return (
    <div className={`grid gap-px md:grid-cols-[0.85fr_2.15fr] ${hasActive ? 'has-active-specimen' : ''}`}>
      {/* Raw textured block — 縮小到「材料樣本」的尺度，不是大面積裝飾板。
          tag 移到右緣的 pinned chip rail，不再擠在底部 */}
      <div
        className="lab-board-fragment relative flex min-h-[9rem] items-start justify-between p-5"
        style={{
          background: `linear-gradient(160deg, ${era.colorProfile.primary} 0%, ${era.colorProfile.secondary} 100%)`,
          clipPath:
            'polygon(0 0, 100% 0, 100% 88%, 90% 100%, 74% 92%, 56% 100%, 38% 91%, 20% 100%, 6% 93%, 0 100%)',
        }}
      >
        <div className="lab-torn-layer-shadow" aria-hidden="true" />
        <div className="lab-halftone" aria-hidden="true" />

        <span
          className="type-mono-xs relative"
          style={{ color: 'rgba(10,9,6,0.75)', filter: 'contrast(1.4)' }}
        >
          <MisregisteredText intensity="double">RAW STOCK</MisregisteredText>
        </span>

        <div className="lab-pinned-chip-rail relative">
          {era.visualKeywords.slice(0, 3).map((kw, i) => (
            <span
              key={kw}
              className="lab-pinned-chip"
              style={{ '--chip-tilt': `${i % 2 === 0 ? -2 : 1.5}deg` } as React.CSSProperties}
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Specimen fragments——往左輕微疊上撕邊（marginLeft 負值），讓兩塊
          視覺上像同一張拼貼，不是兩個互不相干的區塊。固定角度傾斜 +
          高低錯落，圖釘 + 紙標籤 + 釘書針 */}
      <div
        className="grid grid-cols-2 gap-4 p-3 sm:grid-cols-2 md:grid-cols-2"
        style={{ marginLeft: '-0.75rem' }}
      >
        {cases.map((c, i) => (
          <div
            key={c.id}
            style={{
              transform: `rotate(${PIN_ROTATIONS[i % PIN_ROTATIONS.length]}deg)`,
              marginTop: i % 2 === 0 ? 0 : '1.25rem',
            }}
          >
            <SpecimenFragment
              caseItem={c}
              accentColor={accentColor}
              dense
              pinned
              isActive={activeId === c.id}
              onActivate={() => setActiveId(c.id)}
              onDeactivate={() => setActiveId(null)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── SIGNAL STACK — 2010s ────────────────────────────────────── */

function SignalStackBoard({
  cases,
  accentColor,
}: { cases: ReturnType<typeof getCasesByEra>; accentColor: string }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const hasActive = activeId !== null

  const tickerItems = cases
    .map((c, i) => `PACKET 0x${(i + 1).toString(16).toUpperCase().padStart(4, '0')} RECEIVED · DROP #${String(i + 1).padStart(2, '0')} QUEUED`)
    .join('   ·   ')

  return (
    <div>
      {/* packet stream ticker — terminal 風格的捲動條，不是真實社群 feed，
          純粹是平台時代「資料持續流動」的視覺節奏 */}
      <div className="signal-ticker-track mb-8 border-y py-1.5" style={{ borderColor: 'var(--line-color)' }}>
        <span className="signal-ticker-content type-mono-xs" style={{ color: 'var(--color-era-10)' }}>
          {tickerItems}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;{tickerItems}
        </span>
      </div>

      {/* 卡片堆疊 + 右側 signal rail——把右側空白轉成有語義的平台訊號層，
          不是放著不管的空白 dashboard 留白 */}
      <div className={`grid gap-8 md:grid-cols-[1.4fr_1fr] ${hasActive ? 'has-active-specimen' : ''}`}>
        <div className="relative" style={{ maxWidth: '40rem' }}>
          {cases.map((c, i) => (
            <div
              key={c.id}
              className="group lab-board-fragment relative"
              style={{
                marginTop: i === 0 ? 0 : '-1.25rem',
                marginLeft: `${(i % 2) * 2.5}rem`,
                zIndex: cases.length - i,
              }}
            >
              <SpecimenFragment
                caseItem={c}
                accentColor={accentColor}
                signalIndex={i + 1}
                isActive={activeId === c.id}
                onActivate={() => setActiveId(c.id)}
                onDeactivate={() => setActiveId(null)}
              />
            </div>
          ))}
        </div>

        <SignalRail cases={cases} activeId={activeId} />
      </div>
    </div>
  )
}

/* Signal rail——填滿 2010s 右側空白的抽象平台訊號層：timestamp column +
   packet trail + queue depth marker。純粹是視覺節奏，不是真社群 UI */
function SignalRail({
  cases,
  activeId,
}: { cases: ReturnType<typeof getCasesByEra>; activeId: string | null }) {
  return (
    <div className="signal-rail pt-2" aria-hidden="true">
      <p className="lab-meta-tertiary type-mono-xs mb-1">QUEUE DEPTH — {cases.length} PACKETS</p>
      {cases.map((c, i) => {
        const isActive = activeId === c.id
        return (
          <div
            key={c.id}
            className={`signal-rail-row ${isActive ? 'signal-rail-row-active' : ''}`}
          >
            <span>0x{(i + 1).toString(16).toUpperCase().padStart(4, '0')}</span>
            <span className={`signal-rail-trace ${isActive ? 'signal-rail-trace-active' : ''}`} />
            <span>{isActive ? 'LOCKED' : 'IDLE'}</span>
          </div>
        )
      })}
      <div className="signal-rail-row mt-2">
        <span>SCAN</span>
        <span className="signal-rail-trace" />
        <span>{activeId ? 'TRACE ACTIVE' : 'STANDBY'}</span>
      </div>
    </div>
  )
}

/* ── SHARED FRAGMENT — flip card, not an accordion row ──────────
   點擊/Enter 觸發 rotateY flip 看到背面（statement + context + source）。
   背面內部用 Motion Primitives Disclosure 收合「FULL CONTEXT」長文，
   是這個 prototype 裡實際被改造使用的 disclosure pattern，而非主互動。 */

function SpecimenFragment({
  caseItem,
  accentColor,
  dense,
  signalIndex,
  pinned,
  isActive,
  onActivate,
  onDeactivate,
}: {
  caseItem: ReturnType<typeof getCasesByEra>[0]
  accentColor: string
  dense?: boolean
  signalIndex?: number
  pinned?: boolean
  isActive: boolean
  onActivate: () => void
  onDeactivate: () => void
}) {
  // flipped 狀態交給父層 board 控管（isActive/onActivate/onDeactivate），
  // 確保同一個 board 裡一次只有一張卡展開——避免兩張卡同時翻開互相
  // 蓋住文字。父層在 setActiveId 時也會幫整個 board 加
  // .has-active-specimen，讓其他卡片退後（見 globals.css isolation）
  const [fullContextOpen, setFullContextOpen] = useState(false)
  const primarySource = caseItem.sourceNotes[0]
  const specimenState = getCaseSpecimenState(caseItem.type)

  // 卡片只在「未展開」時把整張卡當觸發器；一旦翻面，外層 onClick 移除——
  // 3D rotateY 的子層（FULL CONTEXT 按鈕）疊在同一張卡內，瀏覽器對巢狀
  // 3D 變形元素的 hit-test 在「外層卡片 onClick + 內層按鈕 onClick」並存時
  // 不可靠，stopPropagation 也救不回來。改成背面有獨立的「← BACK」按鈕
  // 負責收回，不依賴點擊卡片本體。
  return (
    <MaterialSpecimenCard
      specimenLabel={`${caseItem.id} — ${caseItem.title}`}
      accentColor={accentColor}
      role="button"
      ariaLabel={`${caseItem.title}, ${isActive ? 'showing detail' : 'showing summary'}`}
      expanded={isActive}
      onClick={isActive ? undefined : onActivate}
      className={isActive ? 'is-active-specimen' : ''}
    >
      {pinned && <span className="specimen-pin" aria-hidden="true" />}
      {pinned && <span className="specimen-tape">{caseItem.year}</span>}
      {pinned && <span className="specimen-staple" aria-hidden="true" />}

      <div
        style={{
          perspective: '1200px',
          minHeight: dense ? '11rem' : '12rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: dense ? '11rem' : '12rem',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.55s var(--ease-archive)',
            transform: isActive ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* FRONT */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div className="flex items-start justify-between">
              <span className="lab-meta-secondary type-mono-xs">
                ACC. {signalIndex ? `2010-0${signalIndex}` : caseItem.id}
              </span>
              {signalIndex ? (
                <span className="signal-packet">DROP #{String(signalIndex).padStart(2, '0')}</span>
              ) : (
                <span className="type-mono-xs" style={{ color: accentColor }}>
                  {caseItem.year}
                </span>
              )}
            </div>

            <p
              className="lab-meta-primary type-statement"
              style={{ fontSize: dense ? '0.8rem' : '1rem' }}
            >
              {caseItem.title}
            </p>

            <div className="flex flex-wrap gap-1">
              {caseItem.visualKeywords.slice(0, 3).map((kw) => (
                <span key={kw} className="keyword-tag" style={{ fontSize: '0.52rem' }}>
                  {kw}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="lab-meta-secondary type-mono-xs">
                STATE: {specimenState}
              </span>
              {signalIndex && (
                <span className="signal-density" aria-hidden="true">
                  {[3, 7, 4, 9, 5].map((h, hi) => (
                    <span key={hi} className="signal-density-bar" style={{ height: `${h}px` }} />
                  ))}
                </span>
              )}
            </div>

            <p className="lab-meta-tertiary type-mono-xs">
              CLICK TO INSPECT
            </p>

            {/* Packet burst — hover 時短暫向外擴散的刻度，模擬訊號封包
                追蹤，只觸發一次性視覺（CSS animation，非持續循環） */}
            {signalIndex && (
              <span className="signal-burst" aria-hidden="true">
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <span
                    key={angle}
                    className="signal-burst-tick"
                    style={{ '--burst-angle': `${angle}deg` } as React.CSSProperties}
                  />
                ))}
              </span>
            )}
          </div>

          {/* BACK — 卡片本體不再是 click target（見上方 onClick 註解），
              所以這裡的按鈕不需要 stopPropagation，直接掛 onClick 即可 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              padding: '1rem',
              overflow: 'auto',
              background: 'var(--color-archive-800)',
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                className="lab-meta-secondary type-mono-xs"
                style={{ background: 'none', border: 'none', padding: 0 }}
                onClick={onDeactivate}
              >
                ← BACK
              </button>
              {primarySource && <SpecimenStamp confidence={primarySource.confidence} />}
            </div>

            <p
              className="type-statement lab-meta-primary mb-2"
              style={{ fontStyle: 'italic', fontSize: '0.78rem' }}
            >
              &ldquo;{caseItem.statement}&rdquo;
            </p>

            <Disclosure open={fullContextOpen} onOpenChange={setFullContextOpen}>
              <DisclosureTrigger>
                <button
                  type="button"
                  className="type-mono-xs mb-1"
                  style={{ color: 'var(--color-archive-500)', background: 'none', border: 'none', padding: 0 }}
                >
                  {fullContextOpen ? '— HIDE FULL CONTEXT' : '+ FULL CONTEXT'}
                </button>
              </DisclosureTrigger>
              <DisclosureContent>
                <p className="type-statement" style={{ fontSize: '0.72rem' }}>
                  {caseItem.context}
                </p>
              </DisclosureContent>
            </Disclosure>

            {primarySource && (
              <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                <SourceMarker confidence={primarySource.confidence} source={primarySource.source} size="compact" />
              </div>
            )}
          </div>
        </div>
      </div>
    </MaterialSpecimenCard>
  )
}
