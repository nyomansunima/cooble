import { GithubOAuthData, GoogleOAuthData } from '~/auth/model/auth.payload.ts'
import { UserPayload } from './model/user.payload.ts'
import { getXataClient, Users } from '~/config/xata.ts'
import { CreateUserInput } from './model/user.input.ts'
import { UnprocessableEntityException } from '../utils/http-exception.ts'

class UserService {
  async getUserByEmail(email: string): Promise<Users | null> {
    const user = await getXataClient().db.users.filter({ email }).getFirst()
    return user
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
}
export const userService = new UserService()
