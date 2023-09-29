import { apiConnection } from './api/api-connection'

class UserService {
  async verifyActivationToken(token: string): Promise<void> {
    try {
      await apiConnection('/user/verify-activation-account', {
        method: 'POST',
        auth: true,
        body: {
          token: token,
        },
      })
    } catch (error) {
      throw error
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      await apiConnection('/user/activation-account-email', {
        method: 'POST',
        auth: true,
      })
    } catch (error) {
      throw error
    }
  }
  async resendVerificationEmail(): Promise<void> {
    try {
      await apiConnection('/user/resend-activation-account-email', {
        method: 'POST',
        auth: true,
      })
      return
    } catch (error) {
      throw error
    }
  }
}
export const userService = new UserService()
