'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

// layout.tsx 是全站共用的 root layout，CursorFollower / ChapterNav 原本對
// 所有路由生效。Phase 6E 後正式首頁（/）也改用 v2 body（V2Home），帶有
// 自己的 ScannerCursor，不該再疊加舊版 dot cursor 與指向 v1 EraSection
// id 的 ChapterNav——兩者語意（v1 章節錨點）對 v2 頁面已經不成立。
//
// 判斷依據從「是不是 /v2-preview」改成「是不是 v2 route」：目前 v2
// 路由就是 `/`（production）與 `/v2-preview`（staging），未來若新增
// 非 v2 的路由（例如獨立的 v1 內容頁），不在這個清單內就會維持舊版
// chrome，不需要再改這個檔案。
const V2_ROUTES = ['/', '/v2-preview']

function isV2Route(pathname: string | null): boolean {
  if (!pathname) return false
  return V2_ROUTES.some((route) =>
    route === '/' ? pathname === '/' : pathname.startsWith(route),
  )
}

export function RouteScopedChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (isV2Route(pathname)) return null
  return <>{children}</>
}
