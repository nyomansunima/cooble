import { http } from '@nitric/sdk'
import Application, { json } from 'express'
import compression from 'compression'
import rateLimiter from 'express-rate-limit'
import helmet from 'helmet'
import expressCors from 'cors'
import morgan from 'morgan'
import authController from './auth/auth.controller'
import userController from './user/user.controller'

/**
 *  Rate limiting to throtler the incoming request
 *  then protect from brute force attack
 */
const rateLimit = rateLimiter({
  limit: 20,
  message: 'Opps, too many request. Please try again later',
  windowMs: 60 * 100 * 15,
})

/** Cors setting and configuration */
const cors = expressCors({ origin: '*' })

/** Bootstrap the application and all dependecies in one place */
async function bootstrap() {
  console.info('Bootstraping application')
  const app = Application()

  console.log('Registering middleware')
  app.use(compression())
  app.use(rateLimit)
  app.use(helmet())
  app.use(cors)
  app.use(json())
  app.use(morgan('combined'))

  // TODO: add auth controller routes
  app.use([authController, userController])

  console.info('Starting the application')
  http(app)
}

bootstrap()
