import { userService } from '../user/user.service.ts'
import { GithubAuthInput, GoogleAuthInput } from './model/auth.input.ts'
import { AuthPayload } from './model/auth.payload.ts'
import { oauthService } from './oauth.service.ts'
import { Users } from '../config/xata.ts'
import * as jose from 'jose'
import { configuration } from '../config/configuration.ts'

class AuthService {
  async generateToken(user: Users): Promise<AuthPayload> {
    const secret = new TextEncoder().encode(
      configuration.auth.jwt.secret,
    )
    const alg = 'HS256'
    const accessToken = await new jose.SignJWT({
      'urn:cooble:claim': true,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer('urn:cooble:issuer')
      .setAudience('urn:cooble:audience')
      .setExpirationTime(configuration.auth.jwt.accessExp)
      .setSubject(user.id)
      .sign(secret)

    const refreshToken = await new jose.SignJWT({
      'urn:cooble:claim': true,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer('urn:cooble:issuer')
      .setAudience('urn:cooble:audience')
      .setExpirationTime(configuration.auth.jwt.refreshExp)
      .setSubject(user.id)
      .sign(secret)

    return {
      accessToken,
      refreshToken,
    }
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
