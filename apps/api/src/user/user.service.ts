import {
  AuthJwtUser,
  GithubOAuthData,
  GoogleOAuthData,
} from '~/auth/model/auth.payload'
import { UserPayload } from './model/user.payload'
import { getXataClient, Users } from '~/config/xata'
import {
  CreateUserInput,
  VerifyActivationAccountInput,
} from './model/user.input'
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '~/utils/http-exception'
import { generateRandomCharsAndNumbers } from '~/utils/helpers'
import { upstashRedis } from '~/config/upstash'
import { emailService } from '~/email/email.service'

class UserService {
  async getUserByEmail(email: string): Promise<Users | null> {
    try {
      const user = await getXataClient().db.users.filter({ email }).getFirst()
      return user
    } catch (error) {
      throw new BadRequestException()
    }
  }

  generateUsernameFromEmail(email: string): string {
    return email.split('@')[0]
  }

  async createNewUser(input: CreateUserInput): Promise<Users> {
    const newUser = await getXataClient().db.users.create(input)
    return newUser
  }

  async assignProvider(user: Users, provider: string): Promise<void> {
    if (!user.providers!.includes(provider)) {
      try {
        await getXataClient().db.users.update(user.id, {
          providers: [...user.providers!, provider],
        })
      } catch {
        throw new UnprocessableEntityException('auth/failed-update-provider')
      }
    }
  }

  async signGoogleUser(input: GoogleOAuthData): Promise<UserPayload> {
    const GOOGLE_PROVIDER = 'google'

    let user = await this.getUserByEmail(input.email)
    if (!user) {
      const newUser: CreateUserInput = {
        avatar: input.picture,
        email: input.email,
        verified: false,
        fullName: input.name,
        role: 'user',
        providers: [GOOGLE_PROVIDER],
        username: this.generateUsernameFromEmail(input.email),
      }

      user = await this.createNewUser(newUser)
    }

    await this.assignProvider(user, GOOGLE_PROVIDER)
    return user
  }

  async signGithubUser(input: GithubOAuthData): Promise<UserPayload> {
    const GITHUB_PROVIDER = 'github'

    let user = await this.getUserByEmail(input.email)
    if (!user) {
      const newUser: CreateUserInput = {
        avatar: input.avatar_url,
        email: input.email,
        verified: false,
        fullName: input.name,
        role: 'user',
        providers: [GITHUB_PROVIDER],
        location: input.location,
        username: this.generateUsernameFromEmail(input.email),
      }

      user = await this.createNewUser(newUser)
    }

    await this.assignProvider(user, GITHUB_PROVIDER)
    return user
  }

  async sendAccountActivationEmail(input: AuthJwtUser): Promise<void> {
    const user = await this.getUserByEmail(input.email)
    if (user) {
      const verificationCode = generateRandomCharsAndNumbers(6)
      await upstashRedis.set(`${user.id}-token`, verificationCode)
      await emailService.sendVerificationEmail(user, verificationCode)
      return
    } else {
      throw new NotFoundException('user/not-found')
    }
  }

  async resendAccountActivationEmail(input: AuthJwtUser): Promise<void> {
    return this.sendAccountActivationEmail(input)
  }

  async activateAccount(userId: string): Promise<void> {
    try {
      await getXataClient().db.users.update(userId, { verified: true })
      return
    } catch (error) {
      throw new UnprocessableEntityException('user/activation-failed')
    }
  }

  async verifyActivationAccount(
    input: VerifyActivationAccountInput,
    authUser: AuthJwtUser,
  ): Promise<void> {
    const user = await this.getUserByEmail(authUser.email)
    if (!user) {
      throw new NotFoundException('user/not-found')
    }

    const token = await upstashRedis.get<string>(`${user.id}-token`)
    if (!token) {
      throw new ForbiddenException('token-expired')
    }

    if (input.token !== token) {
      throw new ConflictException('user-token-invalid')
    }

    await this.activateAccount(user.id)
    await upstashRedis.del(`${user.id}-token`)
    return emailService.sendOnboardingEmail(user)
  }

  async getUserFromCredential(userId: string): Promise<UserPayload> {
    try {
      const user = await getXataClient()
        .db.users.filter({ id: userId })
        .getFirstOrThrow()
      return user
    } catch (error) {
      throw new NotFoundException('user/not-found')
    }
  }
}

export const userService = new UserService()
