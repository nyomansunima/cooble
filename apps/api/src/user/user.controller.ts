import { routeHandler } from '../utils/handler'
import { jwtAuthGuard } from '../auth/jwt-auth.guard'
import { getAuthUser, getBody } from '../utils/helpers'
import { Router } from 'express'
import { userService } from './user.service'
import { validateBody } from '~/utils/validation'
import { VerifyActivationAccountInput } from './model/user.input'

const userController = Router()

userController.get(
  '/user',
  jwtAuthGuard,
  routeHandler((req) => {
    const user = getAuthUser(req)
    return userService.getUserFromCredential(user.id)
  }),
)

userController.post(
  '/user/activation-account-email',
  jwtAuthGuard,
  routeHandler((req) => {
    const user = getAuthUser(req)
    return userService.sendAccountActivationEmail(user)
  }),
)

userController.post(
  '/user/resend-activation-account-email',
  jwtAuthGuard,
  routeHandler((req) => {
    const user = getAuthUser(req)
    return userService.resendAccountActivationEmail(user)
  }),
)

userController.post(
  '/user/verify-activation-account',
  [jwtAuthGuard, validateBody(VerifyActivationAccountInput)],
  routeHandler((req) => {
    const body = getBody(req)
    const user = getAuthUser(req)
    return userService.verifyActivationAccount(body, user)
  }),
)

export default userController
