'use client'

import { useEffect, useRef, useState } from 'react'

// Era 順序與顯示標籤
const ERAS = [
  { id: '1970s', label: "70'S", period: '1970–1979' },
  { id: '1980s', label: "80'S", period: '1980–1989' },
  { id: '1990s', label: "90'S", period: '1990–1999' },
  { id: '2000s', label: "00'S", period: '2000–2009' },
  { id: '2010s', label: "10'S", period: '2010–2019' },
  { id: '2020s', label: "20'S", period: '2020–' },
]

export function ChapterNav() {
  // 預設指向第一個 era，避免進場瞬間所有 tick 都呈現未啟動狀態
  const [activeEra, setActiveEra] = useState<string>(ERAS[0].id)
  const [hoveredEra, setHoveredEra] = useState<string | null>(null)
  // 點擊跳轉後短暫鎖定，避免平滑滾動經過中間 era 時 active state 閃爍
  const manualLockRef = useRef(false)
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const targets = ERAS.map(({ id }) => document.getElementById(`era-${id}`)).filter(Boolean)
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (manualLockRef.current) return
        // 取 intersectionRatio 最高的
        let best: { id: string; ratio: number } | null = null
        for (const entry of entries) {
          const id = entry.target.id.replace('era-', '')
          if (entry.isIntersecting && (best === null || entry.intersectionRatio > best.ratio)) {
            best = { id, ratio: entry.intersectionRatio }
          }
        }
        if (best) setActiveEra(best.id)
      },
      { threshold: [0.1, 0.3, 0.5] },
    )

    targets.forEach((el) => observer.observe(el!))
    return () => {
      observer.disconnect()
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current)
    }
  }, [])

  const scrollToEra = (id: string) => {
    setActiveEra(id)
    manualLockRef.current = true
    if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current)
    lockTimeoutRef.current = setTimeout(() => {
      manualLockRef.current = false
    }, 900)
    document.getElementById(`era-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-label="Chapter navigation"
      className="fixed hidden lg:flex flex-col items-end gap-4"
      style={{
        right: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 200, // --z-chapter-nav
      }}
    >
      {ERAS.map(({ id, label: _label, period }) => {
        const isActive = activeEra === id
        const isHovered = hoveredEra === id

        return (
          <button
            key={id}
            onClick={() => scrollToEra(id)}
            onMouseEnter={() => setHoveredEra(id)}
            onMouseLeave={() => setHoveredEra(null)}
            aria-label={`Jump to ${period}`}
            aria-current={isActive ? 'true' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'none',
              border: 'none',
              padding: '2px 0',
              cursor: 'pointer',
            }}
          >
            {/* Period label — slides in on hover */}
            <span
              className="type-mono-xs"
              style={{
                opacity: isHovered || isActive ? 1 : 0,
                transform: isHovered || isActive ? 'translateX(0)' : 'translateX(4px)',
                transition: 'opacity 0.25s, transform 0.25s',
                color: isActive
                  ? 'var(--color-archive-300)'
                  : 'var(--color-archive-600)',
                whiteSpace: 'nowrap',
                fontSize: '0.55rem',
              }}
            >
              {period}
            </span>

            {/* Tick mark — longer when active */}
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                height: '1px',
                width: isActive ? '18px' : isHovered ? '12px' : '6px',
                background: isActive
                  ? 'var(--color-archive-white)'
                  : isHovered
                  ? 'var(--color-archive-500)'
                  : 'var(--color-archive-700)',
                transition: 'width 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s',
                flexShrink: 0,
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}
