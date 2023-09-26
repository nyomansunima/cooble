import { userService } from '~/user/user.service'
import { GithubAuthInput, GoogleAuthInput } from './model/auth.input'
import { AuthPayload } from './model/auth.payload'
import { oauthService } from './oauth.service'
import { Users } from '~/config/xata'
import * as jwt from 'jsonwebtoken'
import { configuration } from '~/config/configuration'

class AuthService {
  async generateToken(user: Users): Promise<AuthPayload> {
    const payload = {
      'urn:cooble:claim': true,
      email: user.email,
      role: user.role,
    }

    const accessToken = await jwt.sign(payload, configuration.auth.jwt.secret, {
      algorithm: 'HS256',
      issuer: 'urn:cooble:issuer',
      audience: 'urn:cooble:audience',
      expiresIn: configuration.auth.jwt.accessExp,
      subject: user.id,
    })

    const refreshToken = await jwt.sign(
      payload,
      configuration.auth.jwt.secret,
      {
        algorithm: 'HS256',
        issuer: 'urn:cooble:issuer',
        audience: 'urn:cooble:audience',
        expiresIn: configuration.auth.jwt.refreshExp,
        subject: user.id,
      },
    )

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
