import { Cormorant_Garamond, IBM_Plex_Mono } from 'next/font/google'

// Cormorant Garamond — display title / editorial heading only
// fallback: Georgia → 'Times New Roman' → serif
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

// IBM Plex Mono — metadata / case id / source label / year / index
// fallback: 'Courier New' → monospace
export const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal'],
  variable: '--font-ibm-mono',
  display: 'swap',
  fallback: ['Courier New', 'monospace'],
})
