import { Router } from 'oak'
import { middlewareHandler } from '../utils/handler.ts'
import { validateBody } from '~/utils/validation.ts'
import { GithubAuthInput, GoogleAuthInput } from './model/auth.input.ts'
import { getBody } from '~/utils/helpers.ts'
import { authService } from './auth.service.ts'

const authController = new Router()

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
