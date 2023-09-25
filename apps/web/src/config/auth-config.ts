import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { apiConnection } from '~/utils/api-connection'

/**
 * Options and configuration to handle
 * how the next auth work and flow.
 *
 * configuration of provider
 */
export const authConfigOption: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID!,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider == 'google') {
        const res = await apiConnection<any>('/auth/google', {
          method: 'POST',
          body: {
            idToken: account.id_token,
            accessToken: account.access_token,
          },
        })

        user.accessToken = res.accessToken
        user.refreshToken = res.refreshToken

        return true
      }

      if (account?.provider == 'github') {
        const res = await apiConnection<any>('/auth/github', {
          method: 'POST',
          body: { accessToken: account.access_token },
        })

        user.accessToken = res.accessToken
        user.refreshToken = res.refreshToken

        return true
      }
      return false
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }

      return token
    },
    session: async ({ session, token }) => {
      // get the user info from the access token
      const user = await apiConnection<any>('/user', {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      })

      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.issueAt = token.issueAt
      session.expiredAt = token.expiredAt
      session.user = user

      return session
    },
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
}
