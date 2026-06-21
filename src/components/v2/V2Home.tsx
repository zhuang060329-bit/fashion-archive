'use client'

// 共用 v2 homepage body，由 `/`（production，Phase 6E 接入後）與
// `/v2-preview`（staging/comparison route）共用，避免兩處內容各自
// 維護一份、互相漂移。mode prop 只影響 <main> 的 id（production 需要
// 對齊 layout.tsx 的 skip-link 目標 `#main-content`）與 footer 文案
// （production 不應顯示「prototype / not the production homepage」
// 這類過時措辭，preview 則維持 staging 語意）。

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
          {mode === 'production' ? (
            <p className="type-mono-xs" style={{ color: 'var(--color-archive-600)' }}>
              MATERIAL ARCHIVE V2 — LOCAL INTEGRATION BUILD, NOT YET DEPLOYED
            </p>
          ) : (
            <p className="type-mono-xs" style={{ color: 'var(--color-archive-600)' }}>
              STAGING ROUTE — /v2-preview — MIRRORS THE PRODUCTION HOMEPAGE FOR COMPARISON
            </p>
          )}
        </footer>
      </main>
    </>
  )
}
