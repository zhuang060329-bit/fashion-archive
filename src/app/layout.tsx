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

        {/* 反應式材料背景（grain / 纖維場 / cursor bloom）由 v2 的
            ReactiveArchiveBackground 接管，掛在 InteractiveSurface 內，
            不再用 v1 的全域 grain-layer / scanline-layer 靜態貼圖。 */}
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
