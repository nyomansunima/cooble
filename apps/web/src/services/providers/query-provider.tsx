'use client'

import { FC, ReactElement, ReactNode, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

interface QueryProviderProps {
  children: ReactNode
}

/**
 * ## QueryProvider
 *
 * render the provider to allow
 * use the query cached
 *
 * @returns {ReactElement}
 */
const QueryProvider: FC<QueryProviderProps> = ({ children }): ReactElement => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export { QueryProvider }
