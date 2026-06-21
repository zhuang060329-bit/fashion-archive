'use client'

// 共用 v2 homepage body，由 `/`（production，Phase 6E 接入、Phase 6H
// 已正式部署）與 `/v2-preview`（staging/comparison route）共用，避免
// 兩處內容各自維護一份、互相漂移。mode prop 只影響 <main> 的 id
// （production 需要對齊 layout.tsx 的 skip-link 目標 `#main-content`）
// 與 footer 文案（production 顯示「PRODUCTION BUILD」，preview 維持
// staging 語意——production 不應再出現「not yet deployed」這類已經
// 過時的措辭）。

import { useEffect } from 'react'
import { useDesktopViewport } from '@/hooks/useDesktopViewport'
import { DesktopOnlyGate } from '@/components/v2/DesktopOnlyGate'
import { ScannerCursor } from '@/components/v2/ScannerCursor'
import { EntryLab } from '@/components/v2/EntryLab'
import { EraLabSection } from '@/components/v2/EraLabSection'
import { MaterialBoard } from '@/components/v2/MaterialBoard'
import { getEraById } from '@/data/eras'

interface V2HomeProps {
  mode: 'production' | 'preview'
}

export function V2Home({ mode }: V2HomeProps) {
  const isDesktop = useDesktopViewport()

  // Scoped dark scrollbar——只在 mount 期間加在 body 上，離開頁面
  // （unmount）就移除。兩個路由（`/` 與 `/v2-preview`）都需要這個。
  useEffect(() => {
    document.body.classList.add('v2-lab-scope')
    return () => document.body.classList.remove('v2-lab-scope')
  }, [])

  if (!isDesktop) {
    return <DesktopOnlyGate />
  }

  const era1970 = getEraById('1970s')
  const era2010 = getEraById('2010s')

  // production main 需要 id="main-content" 對齊 layout.tsx 的 skip
  // link（`href="#main-content"`），並用 tabIndex={-1} 讓 skip link
  // 啟動後 focus 能真正移入 main（沿用 v1 page.tsx 的既有作法）。
  // preview 路由維持原本的 id，行為不變。
  const mainId = mode === 'production' ? 'main-content' : 'v2-preview-content'

  return (
    <>
      <ScannerCursor />
      <main id={mainId} tabIndex={mode === 'production' ? -1 : undefined}>
        <EntryLab />
        {era1970 && <EraLabSection era={era1970} variant="contrast-grid" />}
        {era2010 && <EraLabSection era={era2010} variant="signal-stack" />}
        <MaterialBoard />
        <footer
          className="px-6 py-12 md:px-10"
          style={{ borderTop: '1px solid var(--line-color)' }}
        >
          {/* Phase 7A 對比修正：footer build label 從 archive-600 (≈1.6:1)
              提到 #726E64（≈3.6:1）——仍是最低調的一層，但不再接近隱形 */}
          {mode === 'production' ? (
            <p className="type-mono-xs" style={{ color: '#726E64' }}>
              MATERIAL ARCHIVE V2 — PRODUCTION BUILD
            </p>
          ) : (
            <p className="type-mono-xs" style={{ color: '#726E64' }}>
              STAGING ROUTE — /v2-preview — MIRRORS THE PRODUCTION HOMEPAGE FOR COMPARISON
            </p>
          )}
        </footer>
      </main>
    </>
  )
}
