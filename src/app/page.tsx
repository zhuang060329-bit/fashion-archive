// 正式首頁掛載 v2（showpiece-interaction-pass）。內容資料層 src/data/*
// 由 v2 元件沿用；舊的 v1 骨架與 Material Lab 元件群已移除。

import { V2Home } from '@/components/v2/V2Home'

export default function ArchivePage() {
  return <V2Home mode="production" />
}
