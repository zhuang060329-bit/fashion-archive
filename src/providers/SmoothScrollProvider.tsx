'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
// gsap.ts module-level 已完成 registerPlugin(ScrollTrigger, useGSAP)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (initialized.current) return
    initialized.current = true

    let lenis: import('lenis').default | null = null
    let tickerCallback: ((time: number) => void) | null = null

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: window.innerWidth >= 768,
      })

      lenis.on('scroll', ScrollTrigger.update)

      tickerCallback = (time: number) => {
        lenis?.raf(time * 1000)
      }

      gsap.ticker.add(tickerCallback)
      gsap.ticker.lagSmoothing(0)
    })

    return () => {
      lenis?.destroy()
      lenis = null
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback)
        tickerCallback = null
      }
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return <>{children}</>
}
