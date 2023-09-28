import { VerifyEmailForm } from '@components/auth/verify-email-form'
import { VerifyEmailImage } from '@components/auth/verify-email-image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activate Account | Cooble',
}

export default function VerifyEmailPage() {
  return (
    <main className="flex h-screen w-screen">
      <VerifyEmailForm />
      <VerifyEmailImage />
    </main>
  )
}
