import { Router } from 'oak'
import { middlewareHandler } from '../utils/handler.ts'
import { jwtAuthGuard } from '~/auth/jwt-auth.guard.ts'
import { getAuthUser } from '~/utils/helpers.ts'

const userController = new Router()

userController.get(
  '/user',
  jwtAuthGuard,
  middlewareHandler((ctx) => {
    const user = getAuthUser(ctx)
    return user
  }),
)

export default userController
