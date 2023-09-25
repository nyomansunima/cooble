'use client'

import { Button } from '@components/ui/button'
import Image from 'next/image'
import * as React from 'react'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import useToastStore from '~/stores/toast-store'

const SigninForm: React.FC = (): React.ReactElement => {
  const authError = useSearchParams().get('error')
  const { showToast } = useToastStore()

  const signWithGoogle = useMutation(async () => {
    await signIn('google', {
      redirect: false,
    })
  })

  const signWithGithub = useMutation(async () => {
    await signIn('github', {
      redirect: false,
    })
  })

  React.useEffect(function showErrorToast() {
    if (authError) {
      showToast({
        title: 'Failed',
        description: 'Opps, something happen when try to authenticated.',
      })
    }
  }, [authError])

  return (
    <section className='flex flex-col h-full w-full laptop:w-1/2 justify-center px-5 laptop:px-28 animate-in duration-700 slide-in-from-bottom-20'>
      <div className='flex flex-col laptop:w-10/12'>
        <Image
          src={'/images/logo.png'}
          height={64}
          width={64}
          alt='Cooble'
          className='object-cover'
          quality={100}
        />

        <h2 className='text-4xl font-medium !leading-tight  mt-5'>
          Design your work from home setup.
        </h2>

        <div className='flex flex-col mt-14 gap-3'>
          <Button
            variant={'primary'}
            size={'md'}
            onClick={() => signWithGoogle.mutate()}
            disabled={signWithGoogle.isLoading}
            data-test-id='test-google-button'
          >
            <i className='fi fi-brands-google text-base' />
            Continue with Google
          </Button>

          <Button
            variant={'outline'}
            size={'md'}
            onClick={() => signWithGithub.mutate()}
            disabled={signWithGithub.isLoading}
            data-test-id='test-github-button'
          >
            <i className='fi fi-brands-github text-base' />
            Continue with Github
          </Button>
        </div>
      </div>
    </section>
  )
}

export { SigninForm }
