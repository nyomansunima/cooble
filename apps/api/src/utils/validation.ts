import { validate } from 'validatorus'
import { RouterContext, Status } from 'oak'
import { getBody, getParams, getQuery } from '../utils/helpers.ts'

/**
 * ## validationMiddleware
 *
 * validate the input for the api
 * for api context, you can validate
 * for body, params and response, other.
 *
 * This working on the middleware layer
 *
 * @param dtoClass the class that include validation that contain `class-validator` validation
 * @param body request data that need to validate as object. eg `params`, `body`, `paths`
 *
 * @returns {Context | Next}
 */
export function validationMiddleware<T extends object>(
  dtoClass: new () => T,
  inputType: 'body' | 'params' | 'query',
): any {
  return async (ctx: RouterContext<any>, next: () => Promise<unknown>) => {
    const requestInput = {
      body: await getBody(ctx),
      query: getQuery(ctx),
      params: getParams(ctx),
    }

    const res = validate(requestInput[inputType], dtoClass)
    if (res.errors) {
      ctx.response.status = Status.NotAcceptable
      return ctx.response.body = {
        message: 'validation/input-error',
        errors: { ...res.errors },
      }
    }

    return await next()
  }
}

/**
 * ## validateBody
 *
 * validate the body request
 *
 * @param dtoClass class passed as validation
 * @returns {ctx}
 */
export function validateBody<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, 'body')
}

/**
 * ## validateParams
 *
 * validate the params that send from incoming request
 *
 * @param dtoClass class passed as validation
 * @returns {ctx}
 */
export function validateParams<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, 'params')
}

/**
 * ## validateQuery
 *
 * validate the query from the income request
 *
 * @param dtoClass class passed as validation
 * @returns {ctx}
 */
export function validateQuery<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, 'query')
}
