import { userService } from '~/user/user.service'
import { GithubAuthInput, GoogleAuthInput } from './model/auth.input'
import { AuthPayload } from './model/auth.payload'
import { oauthService } from './oauth.service'
import { Users } from '~/config/xata'

class AuthService {
  async generateToken(user: Users): Promise<AuthPayload> {
    // TODO: add the code to generate the token payload
    return {} as any
  }

  async googleAuth(input: GoogleAuthInput): Promise<AuthPayload> {
    const googleUser = await oauthService.retrieveGoogleUser(input)
    const user = await userService.signGoogleUser(googleUser)
    const token = await this.generateToken(user)
    return token
  }

  async githubAuth(input: GithubAuthInput): Promise<AuthPayload> {
    const githubUser = await oauthService.retrieveGithubUser(input)
    const user = await userService.signGithubUser(githubUser)
    const token = await this.generateToken(user)
    return token
  }
}

export const authService = new AuthService()
