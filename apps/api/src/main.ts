import { Application } from 'oak'
import { load } from 'std/dotenv/mod.ts'
import * as log from 'std/log/mod.ts'
import * as compress from 'compress'
import { RateLimiter } from 'rate-limit'
import { oakCors } from 'cors'
import authController from '~/auth/auth.controller.ts'
import userController from './user/user.controller.ts'

const rateLimit = await RateLimiter({
  windowMs: 1000,
  max: 10,
  headers: true,
  message: 'Too many requests, please try again later.',
  statusCode: 429,
}) as any

/** Load environment variables before use it */
async function loadConfiguration() {
  log.debug(`Load the environment variables`)
  await load({ export: true })
}

/** Bootstrap the application and all dependecies in one place */
async function bootstrap() {
  await loadConfiguration()

  log.info('Bootstraping the application')

  const app = new Application()
  log.info('Regitering middleware')
  app.use(compress.brotli())
  app.use(rateLimit)
  app.use(oakCors({
    origin: '*',
  }))

  // TODO: Regiter the controller routes
  log.info('Regitering routes')
  app.use(authController.routes(), authController.allowedMethods())
  app.use(userController.routes(), userController.allowedMethods())

  app.addEventListener('listen', ({ hostname, port, secure }) => {
    log.info(
      `Listening on: ${secure ? 'https://' : 'http://'}${
        hostname ?? 'localhost'
      }:${port}`,
    )
  })

  await app.listen({ port: 4000 })
}

bootstrap()
