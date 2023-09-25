import { exportPKCS8 } from 'jose'
import { RouterContext } from 'oak'
import { AuthJwtUser } from '~/auth/model/auth.payload.ts'

/**
 * Get the query params from context
 *
 * @param ctx - router context
 * @returns {Record<string, any>}
 */
export function getQuery(ctx: RouterContext<string>): Record<string, any> {
  const queryParams = ctx.request.url.searchParams
  const queryParamsObject: { [key: string]: string } = {}
  for (const [key, value] of queryParams.entries()) {
    queryParamsObject[key] = value
  }

  return queryParamsObject
}

/**
 * Get the params from context
 *
 * @param ctx - Router context
 * @returns {Record<string, any>}
 */
export function getParams(ctx: RouterContext<string>): Record<string, any> {
  const params = ctx.params
  return params
}

/**
 * Get the body request from context
 *
 * @param ctx - Router context
 * @returns {any}
 */
export async function getBody(ctx: RouterContext<string>): Promise<any> {
  const body = await ctx.request.body().value
  return body
}

/**
 * Get the authentication user from
 * jwt token, Work with jwtAuthGuard
 * @param ctx Router context
 * @returns {AuthJwtUser}
 */
export function getAuthUser(ctx: RouterContext<string>): AuthJwtUser {
  const user = ctx.state.user as AuthJwtUser
  return user
}
