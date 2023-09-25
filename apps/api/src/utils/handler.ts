import { Middleware, RouterContext, RouterMiddleware } from 'oak'
import { HttpErrorException } from './http-exception.ts'

type FallbackFunction = (
  ctx: RouterContext<any>,
  next: () => Promise<unknown>,
) => Promise<any> | any

/**
 * ## routeHandler
 *
 * allow to handle the api call
 * and manage the resource and throw into a response api
 *
 * @param fallbackFunction function to handle and return something
 * @returns {Context}
 */
export function middlewareHandler(
  fallbackFunction: FallbackFunction,
): RouterMiddleware<any> | Middleware {
  return async (ctx: RouterContext<any>, next: any) => {
    try {
      // get the initial data from the given fallback
      // allow to infer all of the function to running
      // then pass the response as json to api
      const returnedData = await fallbackFunction(ctx, next)

      if (returnedData && returnedData.req && returnedData.res) {
        return await next()
      }

      return ctx.response.body = returnedData
    } catch (err) {
      // catch some error
      // then spread it into a custom error http exception
      // this will work with custom http exceptions
      const { message, statusCode, description } = err as HttpErrorException
      ctx.response.status = statusCode
      return ctx.response.body = { message, error: description, statusCode }
    }
  }
}