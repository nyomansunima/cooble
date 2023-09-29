import { Router } from 'express'
import { routeHandler } from '~/utils/handler'
import { validateBody } from '~/utils/validation'
import { GithubAuthInput, GoogleAuthInput } from './model/auth.input'
import { getBody } from '~/utils/helpers'
import { authService } from './auth.service'

const authController = Router()

authController.post(
  '/auth/google',
  validateBody(GoogleAuthInput),
  routeHandler(async (req) => {
    const body = await getBody(req)
    return await authService.googleAuth(body)
  }),
)

authController.post(
  '/auth/github',
  validateBody(GithubAuthInput),
  routeHandler(async (req) => {
    const body = await getBody(req)
    return await authService.githubAuth(body)
  }),
)

export default authController
