import { Users } from '~/config/xata.ts'

export interface CreateUserInput extends Omit<Partial<Users>, 'id'> {}
