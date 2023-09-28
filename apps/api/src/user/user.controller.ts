import { middlewareHandler } from '../utils/handler'
import { jwtAuthGuard } from '../auth/jwt-auth.guard'
import { getAuthUser } from '../utils/helpers'
import { Router } from 'express'
import { userService } from './user.service'

const userController = Router()

userController.get(
  '/user',
  jwtAuthGuard,
  middlewareHandler((req) => {
    const user = getAuthUser(req)
    return user
  }),
)

userController.post(
  '/user/activation-account-email',
  jwtAuthGuard,
  middlewareHandler((req) => {
    const user = getAuthUser(req)
    return userService.sendAccountActivationEmail(user)
  }),
)

export default userController
