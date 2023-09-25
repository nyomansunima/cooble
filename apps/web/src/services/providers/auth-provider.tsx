'use client'

import { FC, ReactElement, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

interface AuthProviderProps {
  children: ReactNode
}

/**
 * Render the provider to add context
 * to authentication with `next-auth`
 *
 * @returns {ReactElement}
 */
const AuthProvider: FC<AuthProviderProps> = ({ children }): ReactElement => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export { AuthProvider }
