import { Session } from 'next-auth'

interface APIConenctionOption extends RequestInit {
  method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
  body?: any
  auth?: boolean
}

// retrive the token in every single request needed
// this will useful when the resource need the
// credential to access resources
export const getSession = async (): Promise<Session | null> => {
  try {
    const res = await fetch('/api/auth/session')

    if (res.ok) {
      const data = await res.json()
      if (data.accessToken) {
        return data
      }
      return null
    } else {
      throw await res.json()
    }
  } catch (error) {
    throw error
  }
}

/**
 * ## useApiConnection
 *
 * Helper to help connec with the core backend api
 * with authentication feature included both in client and server
 */
const apiConnection: <T extends Object>(
  url: RequestInfo | URL,
  options?: APIConenctionOption,
) => Promise<T> = async (url, options) => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL!
  let defaultOption: APIConenctionOption = {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json, text/plain, */*,image/webp',
    },
  }
  if (options?.auth) {
    const session = await getSession()
    if (session) {
      defaultOption = {
        ...defaultOption,
        headers: {
          ...defaultOption.headers,
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    } else {
      throw new Error('Opps, session not found')
    }
  }

  // encode the access url
  // by combine the base and the user access
  const accessUrl =
    url.toString().includes('http://') || url.toString().includes('https://')
      ? url
      : `${baseUrl}${url.toString().startsWith('/') ? url : '/' + url}`

  // before start to return the response
  // ensure all of the response is safe and error handler
  try {
    const res = await fetch(accessUrl, {
      ...defaultOption,
      ...options,
      body: options?.body ? JSON.stringify(options?.body) : undefined,
    })

    if (res.ok) {
      try {
        const data = await res.json()
        return data
      } catch (error) {
        return
      }
    } else {
      throw await res.json()
    }
  } catch (error) {
    throw error
  }
}

export { apiConnection }
