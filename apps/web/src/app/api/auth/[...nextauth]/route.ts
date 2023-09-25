import NextAuth from 'next-auth'
import { authConfigOption } from '~/config/auth-config'

const handler = NextAuth(authConfigOption)
export { handler as GET, handler as POST }
