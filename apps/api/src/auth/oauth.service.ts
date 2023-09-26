import axios from 'axios'
import { GithubAuthInput, GoogleAuthInput } from './model/auth.input'
import {
  GithubOAuthData,
  GithubOAuthEmailData,
  GoogleOAuthData,
} from './model/auth.payload'
import {
  BadGatewayException,
  BadRequestException,
} from '../utils/http-exception'

class OAuthService {
  async retrieveGoogleUser(input: GoogleAuthInput): Promise<GoogleOAuthData> {
    const res = await axios
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
    const emailRes = await axios
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

    const detailRes = await axios
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
