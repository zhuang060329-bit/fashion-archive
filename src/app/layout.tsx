import type { Metadata } from 'next'
import { cormorant, ibmMono } from '@/lib/fonts'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
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

        {/* v2（Material Lab）路由各自掛載自己的 ScannerCursor；舊版 v1
            chrome（CursorFollower / ChapterNav）已於 Phase 6K 移除，
            連帶不再需要 RouteScopedChrome 包裝層。 */}
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
