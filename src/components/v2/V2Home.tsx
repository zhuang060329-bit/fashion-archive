'use client'

// v2 homepage body，由 `/`（production）與 `/v2-preview`（staging）共用。
// showpiece-interaction-pass 架構：
//   InteractiveSurface  — 反應式材料背景 + 統一 pointer/scroll/era 訊號
//   ArchiveLens         — cursor 狀態機（idle/hover/scan/pull/press）
//   EntryScene          — 進站 hero / boot sequence / kinetic 標題 / thesis
//   EraScene ×6         — 1970s–2020s 六個年代，各有版型語法與 motion grammar
//   ClosingThesis       — 收束六機制（取代普通 footer）

import { useEffect } from 'react'
import { useDesktopViewport } from '@/hooks/useDesktopViewport'
import { DesktopOnlyGate } from '@/components/v2/DesktopOnlyGate'
import { InteractiveSurface } from '@/components/v2/system/InteractiveSurface'
import { ArchiveLens } from '@/components/v2/system/ArchiveLens'
import { EntryScene } from '@/components/v2/EntryScene'
import { EraScene } from '@/components/v2/EraScene'
import { ClosingThesis } from '@/components/v2/ClosingThesis'
import { getErasInOrder } from '@/data/eras'

interface V2HomeProps {
  mode: 'production' | 'preview'
}

export function V2Home({ mode }: V2HomeProps) {
  const isDesktop = useDesktopViewport()

  useEffect(() => {
    document.body.classList.add('v2-lab-scope')
    return () => document.body.classList.remove('v2-lab-scope')
  }, [])

  if (!isDesktop) {
    return <DesktopOnlyGate />
  }

  const eras = getErasInOrder()
  const mainId = mode === 'production' ? 'main-content' : 'v2-preview-content'

  return (
    <>
      <ArchiveLens />
      <InteractiveSurface>
        <main id={mainId} tabIndex={mode === 'production' ? -1 : undefined} className="surface-content">
          <EntryScene />
          {eras.map((era) => (
            <EraScene key={era.id} era={era} />
          ))}
          <ClosingThesis />
        </main>
      </InteractiveSurface>
    </>
  )
}
