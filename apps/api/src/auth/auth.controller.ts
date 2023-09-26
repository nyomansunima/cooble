import { Router } from 'express'
import { middlewareHandler } from '~/utils/handler'
import { validateBody } from '~/utils/validation'
import { GithubAuthInput, GoogleAuthInput } from './model/auth.input'
import { getBody } from '~/utils/helpers'
import { authService } from './auth.service'

const authController = Router()

authController.post(
  '/auth/google',
  validateBody(GoogleAuthInput),
  middlewareHandler(async (ctx) => {
    const body = await getBody(ctx)
    return await authService.googleAuth(body)
  }),
)

authController.post(
  '/auth/github',
  validateBody(GithubAuthInput),
  middlewareHandler(async (ctx) => {
    const body = await getBody(ctx)
    return await authService.githubAuth(body)
  }),
)

export default authController
