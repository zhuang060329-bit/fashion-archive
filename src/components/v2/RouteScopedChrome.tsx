'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

// layout.tsx 是全站共用的 root layout，CursorFollower / ChapterNav 原本對
// 所有路由生效。v2 prototype 路由 (/v2-preview) 有自己的 ScannerCursor，
// 不該疊加舊版 dot cursor 與指向 production anchor 的 ChapterNav。
// 這個 wrapper 只在 /v2-preview 隱藏 children，production 首頁（/）行為
// 完全不變。
export function RouteScopedChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/v2-preview')) return null
  return <>{children}</>
}
