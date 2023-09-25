import { SigninForm } from '@components/auth/auth-form'
import { SigninImage } from '@components/auth/signin-image'
import { Button } from '@components/ui/button'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signin | Cooble',
}

export default function SigninPage() {
  return (
    <main className='flex h-screen w-screen'>
      <Button
        asChild
        variant={'outline'}
        size={'sm'}
        className='absolute top-5 laptop:left-24 left-5 animate-in slide-in-from-top-6 duration-1000'
      >
        <Link href={'/'}>
          <i className='fi fi-rr-arrow-left text-base' />
          Back
        </Link>
      </Button>
      <SigninForm />
      <SigninImage />
    </main>
  )
}
