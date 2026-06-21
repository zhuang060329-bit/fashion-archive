// Phase 6E：正式首頁接入 Material Archive / Garment Lab（v2）。
// v1 內容骨架（EntryScreen / EraSection / TrendSystem / GarmentIndex）
// 仍保留在 src/components/，未刪除，僅不再從這個路由引用——
// 詳見 docs/material-archive-v2.md 的 Phase 6F cleanup 章節。

import { V2Home } from '@/components/v2/V2Home'

export default function ArchivePage() {
  return <V2Home mode="production" />
}
