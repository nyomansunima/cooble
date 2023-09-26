import { IsNotEmpty, IsString } from 'class-validator'

export class GoogleAuthInput {
  @IsString()
  @IsNotEmpty()
  accessToken: string

  @IsString()
  idToken: string
}

export class GithubAuthInput {
  @IsString()
  @IsNotEmpty()
  accessToken: string
}
