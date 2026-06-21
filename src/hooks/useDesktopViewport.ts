'use client'

import { useEffect, useState } from 'react'

export const DESKTOP_BREAKPOINT_PX = 1024

// v2 是 desktop-only experience：<1024px 一律視為「viewport insufficient」，
// 由呼叫端決定要顯示 DesktopOnlyGate 還是隱藏互動層
export function useDesktopViewport(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT_PX}px)`).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT_PX}px)`)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isDesktop
}

export function useIsCoarsePointer(): boolean {
  const [isCoarse, setIsCoarse] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: coarse)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const handler = (e: MediaQueryListEvent) => setIsCoarse(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isCoarse
}
