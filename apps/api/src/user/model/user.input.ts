import { IsNotEmpty, IsString } from 'class-validator'
import { Users } from '~/config/xata'

export interface CreateUserInput extends Omit<Partial<Users>, 'id'> {}

export class VerifyActivationAccountInput {
  @IsString()
  @IsNotEmpty()
  token: string
}
