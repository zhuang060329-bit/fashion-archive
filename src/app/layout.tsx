import type { Metadata } from 'next'
import { cormorant, ibmMono } from '@/lib/fonts'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import { CursorFollower } from '@/components/CursorFollower'
import { ChapterNav } from '@/components/ChapterNav'
import { RouteScopedChrome } from '@/components/v2/RouteScopedChrome'
import './globals.css'

const SITE_TITLE = 'Fashion Archive — Post-1970 Trend Intelligence'
const SITE_DESCRIPTION =
  'An independent educational editorial on post-1970 fashion history, trend mutation, and cultural case studies. Not affiliated with referenced brands.'

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  robots: 'index, follow',
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${ibmMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Grain film overlay — position:fixed, --z-grain */}
        <div className="grain-layer" aria-hidden="true" />
        {/* Scanline overlay — position:fixed, --z-scanline */}
        <div className="scanline-layer" aria-hidden="true" />

        <RouteScopedChrome>
          <CursorFollower />
          <ChapterNav />
        </RouteScopedChrome>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
