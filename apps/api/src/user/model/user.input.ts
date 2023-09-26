import { Users } from '~/config/xata'

export interface CreateUserInput extends Omit<Partial<Users>, 'id'> {}
