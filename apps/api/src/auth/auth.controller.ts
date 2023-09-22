import { Hono } from 'hono'
import { routeHandler } from '~/utils/route-handler'
import { zValidator } from '@hono/zod-validator'
import {
  githubAuthInputSchema,
  googleAuthInputSchema,
} from './model/auth.input'
import { authService } from './auth.service'

const authController = new Hono()

authController
  .post(
    '/google',
    zValidator('json', googleAuthInputSchema),
    routeHandler(async (ctx) => {
      const body = await ctx.req.json()
      return await authService.googleAuth(body)
    }),
  )
  .post(
    '/github',
    zValidator('json', githubAuthInputSchema),
    routeHandler(async (ctx) => {
      const body = await ctx.req.json()
      return await authService.githubAuth(body)
    }),
  )

export default authController
