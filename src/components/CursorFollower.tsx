'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined') return
    // 觸控裝置不啟用
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (prefersReduced) return

    const dot = dotRef.current
    const label = labelRef.current
    if (!dot || !label) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let dotX = mouseX
    let dotY = mouseY

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      const host = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]')
      const cursorText = host?.dataset.cursor ?? ''
      label.textContent = cursorText ? `+${cursorText}` : ''
      gsap.to(label, { opacity: cursorText ? 1 : 0, duration: 0.2, overwrite: 'auto' })
    }

    const onEnter = () => gsap.to(dot, { opacity: 1, duration: 0.35 })
    const onLeave = () => {
      gsap.to(dot, { opacity: 0, duration: 0.3 })
      gsap.to(label, { opacity: 0, duration: 0.2 })
    }

    document.documentElement.addEventListener('mouseenter', onEnter)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.addEventListener('mousemove', onMove)

    // GSAP ticker lerp — dot 跟隨，label 直接跟游標
    const tick = () => {
      dotX += (mouseX - dotX) * 0.1
      dotY += (mouseY - dotY) * 0.1
      gsap.set(dot, { x: dotX - 3, y: dotY - 3 })
      gsap.set(label, { x: mouseX + 14, y: mouseY - 7 })
    }
    gsap.ticker.add(tick)

    document.documentElement.style.cursor = 'none'

    return () => {
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
      document.documentElement.style.cursor = ''
    }
  }, [prefersReduced])

  // 永遠 render DOM（opacity 0）避免 hydration mismatch
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--color-archive-white)',
          pointerEvents: 'none',
          zIndex: 900, // --z-cursor
          opacity: 0,
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={labelRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.18em',
          color: 'var(--color-archive-400)',
          pointerEvents: 'none',
          zIndex: 900, // --z-cursor
          opacity: 0,
          whiteSpace: 'nowrap',
        }}
      />
    </>
  )
}
