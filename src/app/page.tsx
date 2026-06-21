// 正式首頁掛載 Material Archive / Garment Lab（v2）。
// 舊版 v1 內容骨架（EntryScreen / EraSection / TrendSystem /
// GarmentIndex 等）已於 Phase 6K 從 codebase 移除；底層的
// src/data/* 與 SourceMarker 仍保留，由 v2 元件沿用。
// 詳見 docs/material-archive-v2.md。

import { V2Home } from '@/components/v2/V2Home'

export default function ArchivePage() {
  return <V2Home mode="production" />
}
