// Phase 6E：staging / comparison route。正式首頁（src/app/page.tsx）
// 已在 Phase 6E 接入同一份 v2 body（見 V2Home），這個路由保留下來，
// 作為「跟正式首頁完全一致」的對照頁面，方便日後比對 production 是否
// 走偏。內容已抽到 src/components/v2/V2Home.tsx 共用，這裡與
// page.tsx 都只是傳入不同 mode，不會各自維護一份重複內容。

import { V2Home } from '@/components/v2/V2Home'

export default function V2PreviewPage() {
  return <V2Home mode="preview" />
}
