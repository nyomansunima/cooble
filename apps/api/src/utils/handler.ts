import { NextFunction, Request, RequestHandler, Response } from 'express'
import { HttpErrorException } from './http-exception'

type FallbackFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
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
export function routeHandler(
  fallbackFunction: FallbackFunction,
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the initial data from the given fallback
      // allow to infer all of the function to running
      // then pass the response as json to api
      const returnedData = await fallbackFunction(req, res, next)
      return res.json(returnedData)
    } catch (err) {
      // catch some error
      // then spread it into a custom error http exception
      // this will work with custom http exceptions
      const { message, statusCode, description } = err as HttpErrorException
      return res.status(statusCode).json({
        statusCode,
        message,
        error: description,
      })
    }
  }
}

export function exceptionMiddlewareHandler(
  fallbackFunction: FallbackFunction,
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the initial data from the given fallback
      // allow to infer all of the function to running
      // then pass the response as json to api
      await fallbackFunction(req, res, next)
      return next()
    } catch (err) {
      // catch some error
      // then spread it into a custom error http exception
      // this will work with custom http exceptions
      const { message, statusCode, description } = err as HttpErrorException
      return res.status(statusCode).json({
        statusCode,
        message,
        error: description,
      })
    }
  }
}
