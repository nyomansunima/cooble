import { validate } from 'class-validator'
import { getBody, getParams, getQuery } from '~/utils/helpers'
import { NextFunction, Request, RequestHandler, Response } from 'express'

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
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = new dtoClass()
    const requestInput = {
      body: getBody(req),
      query: getQuery(req),
      params: getParams(req),
    }

    Object.assign(dtoInstance, requestInput[inputType])
    requestInput[inputType] = dtoInstance

    const errors = await validate(dtoInstance, {
      forbidUnknownValues: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })

    if (errors && errors.length > 0) {
      const validationErrors = {}

      errors.forEach((error) => {
        validationErrors[error.property] = Object.values(
          error.constraints || {},
        )
      })

      const errorResponse = {
        statusCode: '402',
        message: 'validation/invalid-input',
        errors: validationErrors,
      }

      return res.status(402).json(errorResponse)
    }

    return next()
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
