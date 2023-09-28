import { VerifyEmailTemplate } from '@templates/emails/verification-email-template'
import * as React from 'react'
import { resendClient } from '~/config/resend'
import { Users } from '~/config/xata'
import { InternalServerErrorException } from '~/utils/http-exception'

class EmailService {
  async sendVerificationEmail(
    user: Users,
    verificationCode: string,
  ): Promise<void> {
    try {
      await resendClient.emails.send({
        from: 'verify@sonibble.com',
        to: [user.email!],
        subject: 'Activate Cooble Account',
        react: React.createElement(VerifyEmailTemplate, {
          fullName: user.fullName!,
          verificationCode: verificationCode,
        }),
      })
      return
    } catch (error) {
      throw new InternalServerErrorException('email/failed-sending-email')
    }
  }
}
export const emailService = new EmailService()
