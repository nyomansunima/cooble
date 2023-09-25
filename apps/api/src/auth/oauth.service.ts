import axiod from 'axiod'
import { GithubAuthInput, GoogleAuthInput } from './model/auth.input.ts'
import {
  GithubOAuthData,
  GithubOAuthEmailData,
  GoogleOAuthData,
} from './model/auth.payload.ts'
import {
  BadGatewayException,
  BadRequestException,
} from '../utils/http-exception.ts'

class OAuthService {
  async retrieveGoogleUser(input: GoogleAuthInput): Promise<GoogleOAuthData> {
    const res = await axiod
      .get<GoogleOAuthData>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${input.accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${input.idToken}`,
          },
        },
      )
      .then((res) => res.data)
      .catch(() => {
        throw new BadRequestException(
          'auth/retrieve-google-user-failed',
          'Opps, cannot get the google user',
        )
      })

    return res
  }

  async retrieveGithubUser(input: GithubAuthInput): Promise<GithubOAuthData> {
    const emailRes = await axiod
      .get<GithubOAuthEmailData[]>(`https://api.github.com/user/emails`, {
        headers: {
          Authorization: `Bearer ${input.accessToken}`,
        },
      })
      .then((res) => res.data)
      .catch(() => {
        throw new BadGatewayException(
          'auth/retrieve-github-user-failed',
          'Opps cannot get the current github account',
        )
      })

    const detailRes = await axiod
      .get(`https://api.github.com/user`, {
        headers: {
          Authorization: `Bearer ${input.accessToken}`,
        },
      })
      .then((res) => res.data)
      .catch(() => {
        throw new BadGatewayException(
          'auth/retrieve-github-user-failed',
          'Opps cannot get the current github account',
        )
      })

    return { ...detailRes, email: emailRes[0].email }
  }
}

export const oauthService = new OAuthService()
