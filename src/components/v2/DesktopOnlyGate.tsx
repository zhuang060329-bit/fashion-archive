// Mobile / small-tablet fallback for the v2 Material Lab experience.
// v2 是 desktop-only：這個畫面取代整個互動體驗，不嘗試壓縮 scanner / drag /
// specimen board 進小螢幕。沒有 custom cursor、沒有 GSAP/Lenis 初始化、
// 沒有圖片載入——純 CSS + 少量 inline SVG，避免手機看到破版的桌面版面。

export function DesktopOnlyGate() {
  return (
    <main
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 py-8"
      style={{ background: 'var(--color-archive-black)', color: 'var(--color-archive-white)' }}
      aria-label="Fashion Archive — desktop required"
    >
      {/* corner marks，沿用既有 archive 視覺語彙 */}
      <div className="pointer-events-none absolute inset-4" aria-hidden="true">
        <div className="corner-mark corner-mark-tl" />
        <div className="corner-mark corner-mark-tr" />
        <div className="corner-mark corner-mark-bl" />
        <div className="corner-mark corner-mark-br" />
      </div>

      {/* 單條掃描線，靠 CSS animation，no JS / no GSAP */}
      <div
        aria-hidden="true"
        className="gate-scanline"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '1px',
          background: 'var(--color-archive-400)',
        }}
      />

      <header className="flex items-center justify-between">
        <span className="type-mono-xs">FASHION ARCHIVE</span>
        <span className="type-mono-xs">MODE: MATERIAL LAB</span>
      </header>

      <div className="flex flex-1 flex-col items-start justify-center gap-6 py-12">
        <p className="type-mono-xs" style={{ color: 'var(--color-era-10)' }}>
          VIEWPORT: INSUFFICIENT
        </p>
        <h1
          className="type-chapter"
          style={{ fontSize: 'clamp(2rem, 9vw, 2.8rem)', maxWidth: '22ch' }}
        >
          This archive is designed for desktop inspection.
        </h1>
        <p className="type-statement" style={{ maxWidth: '32ch' }}>
          Open on a larger screen to enter the material lab. The specimen
          boards, scanner cursor, and inspection tools below need room to
          work properly.
        </p>
        <div className="flex flex-col gap-1 pt-4">
          <span className="type-mono-xs">REQUIRED: DESKTOP / LARGE TABLET</span>
          <span className="type-mono-xs">MIN WIDTH: 1024PX</span>
        </div>
      </div>

      <footer className="flex flex-col gap-2 border-t pt-4" style={{ borderColor: 'var(--line-color)' }}>
        <p className="type-mono-xs" style={{ color: 'var(--color-archive-600)' }}>
          Independent educational / editorial project. Not affiliated with
          any brand or designer referenced elsewhere in this archive.
        </p>
      </footer>

      <style>{`
        .gate-scanline { animation: gate-scan 3.6s ease-in-out infinite; opacity: 0; }
        @keyframes gate-scan {
          0%   { top: 8%; opacity: 0; }
          10%  { opacity: 0.35; }
          90%  { opacity: 0.35; }
          100% { top: 92%; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gate-scanline { animation: none !important; opacity: 0 !important; }
        }
      `}</style>
    </main>
  )
}
