import { configuration } from '~/config/configuration'
import * as jwt from 'jsonwebtoken'
import {
  ForbiddenException,
  UnauthorizedException,
} from '~/utils/http-exception'
import { AuthJwtUser } from './model/auth.payload'
import { middlewareHandler } from '~/utils/handler'

async function verifyJwtToken(token: string): Promise<any> {
  try {
    const payload = (await jwt.verify(token, configuration.auth.jwt.secret, {
      issuer: 'urn:cooble:issuer',
      audience: 'urn:cooble:audience',
    })) as any

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
export const jwtAuthGuard = middlewareHandler(async (req, res, next) => {
  const token =
    req.headers['authorization'] &&
    req.headers['authorization'].toString().split(' ')[1]

  if (!token) {
    throw new ForbiddenException('auth/credential-need')
  }

  const payload = await verifyJwtToken(token)
  req['user'] = payload

  return next()
})
