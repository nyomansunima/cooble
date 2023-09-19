import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { ReactNode } from 'react'

const dmSans = DM_Sans({ display: 'swap', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Work from anywhere you want | Cooble',
  description:
    'Start working from anywhere you want, travel, holiday, bali, and other favorite place. Build your remote work setup.',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} text-base font-normal text-black bg-light leading-normal`}
      >
        {children}
      </body>
    </html>
  )
}
