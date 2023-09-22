import { GithubOAuthData, GoogleOAuthData } from '~/auth/model/auth.payload'
import { UserPayload } from './model/user.payload'
import { Users, getXataClient } from '~/config/xata'
import { CreateUserInput } from './model/user.input'
import { UnprocessableEntityException } from '~/common/http-exception'

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
      } catch (error) {
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
