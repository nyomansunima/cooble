import { middlewareHandler } from '../utils/handler'
import { jwtAuthGuard } from '../auth/jwt-auth.guard'
import { getAuthUser } from '../utils/helpers'
import { Router } from 'express'

const userController = Router()

userController.get(
  '/user',
  jwtAuthGuard,
  middlewareHandler((ctx) => {
    const user = getAuthUser(ctx)
    return user
  }),
)

export default userController
