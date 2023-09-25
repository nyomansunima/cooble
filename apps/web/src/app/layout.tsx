import { QueryProvider } from '@services/providers/query-provider'
import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { FC, ReactElement, ReactNode } from 'react'
import { AuthProvider } from '@services/providers/auth-provider'
import Toast from '@components/ui/toast'

const dmSans = DM_Sans({ display: 'swap', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Work from anywhere you want | Cooble',
  description:
    'Start working from anywhere you want, travel, holiday, bali, and other favorite place. Build your remote work setup.',
}

interface RootLayoutProps {
  children: ReactNode
}

/** Place all of the provider to provide the application context */
const StackProviders: FC<RootLayoutProps> = ({ children }) => {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryProvider>
  )
}

/** Group the component that should be available globally in app */
const RootComponents: FC = (): ReactElement => {
  return (
    <>
      <Toast />
    </>
  )
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body
        className={`${dmSans.className} text-base font-normal text-black bg-light leading-normal`}
      >
        <StackProviders>
          <>
            {children}
            <RootComponents />
          </>
        </StackProviders>
      </body>
    </html>
  )
}
