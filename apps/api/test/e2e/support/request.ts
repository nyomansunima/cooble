import Application, { json } from 'express'
import compression from 'compression'
import rateLimiter from 'express-rate-limit'
import helmet from 'helmet'
import expressCors from 'cors'
import morgan from 'morgan'
import authController from '~/auth/auth.controller'
import userController from '~/user/user.controller'
import supertest from 'supertest'

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

const app = Application()
app.use(compression())
app.use(rateLimit)
app.use(helmet())
app.use(cors)
app.use(json())
app.use(morgan('combined'))

// TODO: add auth controller routes
app.use([authController, userController])

export const request = supertest(app)
