'use client'

// Phase 6B dev-only preview route — 不接入正式首頁（src/app/page.tsx 完全未改動）。
// production 入口仍然是 / ，這個路由只在 review v2 prototype 時使用，
// 可以直接刪除這個檔案 revert，不影響任何 production 程式碼。

import { useEffect } from 'react'
import { useDesktopViewport } from '@/hooks/useDesktopViewport'
import { DesktopOnlyGate } from '@/components/v2/DesktopOnlyGate'
import { ScannerCursor } from '@/components/v2/ScannerCursor'
import { EntryLab } from '@/components/v2/EntryLab'
import { EraLabSection } from '@/components/v2/EraLabSection'
import { MaterialBoard } from '@/components/v2/MaterialBoard'
import { getEraById } from '@/data/eras'

export default function V2PreviewPage() {
  const isDesktop = useDesktopViewport()

  // Scoped dark scrollbar——只在這個路由 mount 期間加在 body 上，
  // 離開頁面（unmount）就移除，不影響 production 首頁
  useEffect(() => {
    document.body.classList.add('v2-lab-scope')
    return () => document.body.classList.remove('v2-lab-scope')
  }, [])

  if (!isDesktop) {
    return <DesktopOnlyGate />
  }

  const era1970 = getEraById('1970s')
  const era2010 = getEraById('2010s')

  return (
    <>
      <ScannerCursor />
      <main id="v2-preview-content">
        <EntryLab />
        {era1970 && <EraLabSection era={era1970} variant="contrast-grid" />}
        {era2010 && <EraLabSection era={era2010} variant="signal-stack" />}
        <MaterialBoard />
        <footer
          className="px-6 py-12 md:px-10"
          style={{ borderTop: '1px solid var(--line-color)' }}
        >
          <p className="type-mono-xs" style={{ color: 'var(--color-archive-600)' }}>
            PHASE 6B PROTOTYPE — /v2-preview — NOT THE PRODUCTION HOMEPAGE
          </p>
        </footer>
      </main>
    </>
  )
}
