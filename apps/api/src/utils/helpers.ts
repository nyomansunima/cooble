import { Request } from 'express'
import { AuthJwtUser } from '~/auth/model/auth.payload'

/**
 * Get the query params from context
 *
 * @param ctx - router context
 * @returns {Record<string, any>}
 */
export function getQuery(req: Request): Record<string, any> {
  const queryParams = req.query
  return queryParams
}

/**
 * Get the params from context
 *
 * @param ctx - Router context
 * @returns {Record<string, any>}
 */
export function getParams(req: Request): Record<string, any> {
  const params = req.params
  return params
}

/**
 * Get the body request from context
 *
 * @param ctx - Router context
 * @returns {any}
 */
export function getBody(req: Request): any {
  const body = req.body
  return body
}

/**
 * Get the authentication user from
 * jwt token, Work with jwtAuthGuard
 * @param ctx Router context
 * @returns {AuthJwtUser}
 */
export function getAuthUser(req: Request): AuthJwtUser {
  const user = req['user'] as any
  return user
}
