import { IsString } from 'validatorus'

export class GoogleAuthInput {
  @IsString()
  accessToken!: string

  @IsString()
  idToken!: string
}

export class GithubAuthInput {
  @IsString()
  accessToken!: string
}
