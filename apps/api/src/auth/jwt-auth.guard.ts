import { configuration } from '../config/configuration.ts'
import * as jose from 'jose'
import {
  ForbiddenException,
  UnauthorizedException,
} from '../utils/http-exception.ts'
import { AuthJwtUser } from './model/auth.payload.ts'
import { middlewareHandler } from '../utils/handler.ts'

async function verifyJwtToken(token: string): Promise<any> {
  try {
    const secret = new TextEncoder().encode(
      configuration.auth.jwt.secret,
    )
    const { payload } = await jose.jwtVerify(token, secret, {
      issuer: 'urn:cooble:issuer',
      audience: 'urn:cooble:audience',
    })

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    } as AuthJwtUser
  } catch {
    throw new UnauthorizedException('auth/invalid-token')
  }
}

/**
 * Protecting the routes using authentication
 * with JWT. Need to add authorization in headers
 *
 * @param ctx Router context
 * @param next middlware
 */
export const jwtAuthGuard = middlewareHandler(async (ctx, next) => {
  const token = ctx.request.headers.get('Authorization') &&
    ctx.request.headers.get('Authorization')?.split(' ')[1]

  if (!token) {
    throw new ForbiddenException('auth/credential-need')
  }

  const payload = await verifyJwtToken(token)
  ctx.state.user = payload

  return await next()
})
