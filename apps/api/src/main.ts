import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'
import authController from './auth/auth.controller'
import { routeHandler } from './utils/route-handler'
import { NotFoundException } from './common/http-exception'

/**
 * ## app
 * define the application to server the worksers
 */
const app = new Hono()

// middlware allow to add more configuration
// to the basic application
app.use('*', poweredBy())
app.use('*', logger())
app.use('/*', cors({ origin: '*' }))
app.use('*', secureHeaders())
app.use('*', prettyJSON())

// register another controller to manage the routes
// TODO:  add all of the controller of rest api
app.route('/auth', authController)
app.notFound(
  routeHandler(() => {
    throw new NotFoundException(
      'not found',
      'Opps something missing from your url. Please use the correct methods, and url',
    )
  }),
)

export default app
