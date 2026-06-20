import { EntryScreen } from '@/components/EntryScreen'
import { EraSection } from '@/components/EraSection'
import { TrendSystem } from '@/components/TrendSystem'
import { GarmentIndex } from '@/components/GarmentIndex'
import { getEraById } from '@/data/eras'
import { archiveConfig } from '@/data/archive'

// 版型分配：
//   left-index  — 1970s, 2000s（索引感、目錄式）
//   full-title  — 1990s, 2020s（概念宣告、標題即論點）
//   overlay     — 1980s, 2010s（過剩/噪音，年代數字壓在背後）

export default function ArchivePage() {
  const era1970 = getEraById('1970s')
  const era1980 = getEraById('1980s')
  const era1990 = getEraById('1990s')
  const era2000 = getEraById('2000s')
  const era2010 = getEraById('2010s')
  const era2020 = getEraById('2020s')

  // tabIndex={-1}：skip link 啟動後讓 focus 真正移入 main，
  // 而不是停在原處（main 本身不在 tab 順序中，僅作為程式化 focus 目標）
  return (
    <main id="main-content" tabIndex={-1}>
      {/* ── ENTRY SCREEN ─────────────────────────────────────── */}
      <EntryScreen />

      {/* ── THESIS ───────────────────────────────────────────── */}
      <section
        className="px-6 md:px-10 py-24 md:py-32"
        style={{ borderTop: '1px solid var(--line-color)' }}
        aria-label="Archive thesis"
      >
        <div
          className="header-grid-1-2 grid gap-8 md:gap-12"
          style={{ maxWidth: '60rem' }}
        >
          {/* Left column — archive annotation */}
          <div className="flex flex-col gap-5">
            <p className="type-mono-xs" style={{ color: 'var(--color-archive-600)' }}>
              ——THESIS——
            </p>
            <div style={{ width: '1.75rem', height: '1px', background: 'var(--color-archive-500)' }} />
            <p
              className="type-mono-xs hidden md:block"
              style={{
                writingMode: 'vertical-rl',
                letterSpacing: '0.18em',
                color: 'var(--color-archive-700)',
                userSelect: 'none',
              }}
            >
              POST-1970 FASHION
            </p>
          </div>

          {/* Right column — thesis content */}
          <div
            className="space-y-6"
            style={{
              borderLeft: '1px solid var(--color-archive-700)',
              paddingLeft: 'clamp(1.25rem, 3vw, 2rem)',
            }}
          >
            {archiveConfig.thesisLines.map((line, i) => (
              <p
                key={i}
                className={i === 0 ? 'type-chapter' : 'type-statement'}
                style={
                  i === 0
                    ? { fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', lineHeight: 1.1 }
                    : undefined
                }
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── ERA SECTIONS ─────────────────────────────────────── */}

      {/* 1970s — left-index: 亞文化索引，左側大字右側內容 */}
      {era1970 && (
        <EraSection era={era1970} layout="left-index" index={0} />
      )}

      {/* 1980s — overlay: 過剩年代，金色年代數字壓在背後 */}
      {era1980 && (
        <EraSection era={era1980} layout="overlay" index={1} />
      )}

      {/* 1990s — full-title: 反時尚宣言，標題即論點 */}
      {era1990 && (
        <EraSection era={era1990} layout="full-title" index={2} />
      )}

      {/* 2000s — left-index: Y2K 目錄，狗仔索引 */}
      {era2000 && (
        <EraSection era={era2000} layout="left-index" index={3} />
      )}

      {/* 2010s — overlay: 街頭文化噪音，紅色訊號年代數字 */}
      {era2010 && (
        <EraSection era={era2010} layout="overlay" index={4} />
      )}

      {/* 2020s — full-title: 安靜奢華，標題夠，不需要其他宣告 */}
      {era2020 && (
        <EraSection era={era2020} layout="full-title" index={5} />
      )}

      {/* ── TREND INTELLIGENCE SYSTEM ────────────────────────── */}
      <TrendSystem />

      {/* ── GARMENT INDEX ────────────────────────────────────── */}
      <GarmentIndex />

      {/* ── PROJECT NOTES / DISCLAIMER ───────────────────────── */}
      <footer
        className="px-6 md:px-10 py-16"
        style={{ borderTop: '1px solid var(--line-color)' }}
        aria-label="Project notes and disclaimer"
      >
        <div className="header-grid-1-2 grid gap-6 md:gap-10">
          <div>
            <p className="type-mono-xs mb-1" style={{ color: 'var(--color-archive-600)' }}>
              ABOUT THIS ARCHIVE
            </p>
            <p className="type-mono-xs" style={{ color: 'var(--color-archive-700)' }}>
              PROJECT NOTES
            </p>
          </div>
          <div className="space-y-4">
            <p className="type-statement" style={{ fontSize: '0.78rem', lineHeight: 1.65 }}>
              {archiveConfig.disclaimer}
            </p>
            <p className="type-mono-xs" style={{ color: 'var(--color-archive-600)' }}>
              VERSION {archiveConfig.version} — {archiveConfig.lastUpdated}
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
