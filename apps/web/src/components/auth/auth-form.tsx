'use client'

import { Button } from '@components/ui/button'
import Image from 'next/image'
import { FC, ReactElement } from 'react'
import { useMutation } from '@tanstack/react-query'

const SigninForm: FC = (): ReactElement => {
  const signWithGoogle = useMutation(async () => {})

  const signWithGithub = useMutation(async () => {})

  return (
    <section className="flex flex-col h-full w-full laptop:w-1/2 justify-center px-5 laptop:px-28 animate-in duration-700 slide-in-from-bottom-20">
      <div className="flex flex-col laptop:w-10/12">
        <Image
          src={'/images/logo.png'}
          height={64}
          width={64}
          alt="Cooble"
          objectFit="contain"
        />

        <h2 className="text-4xl font-medium !leading-tight  mt-5">
          Design your work from home setup.
        </h2>

        <div className="flex flex-col mt-14 gap-3">
          <Button
            variant={'primary'}
            size={'md'}
            onClick={() => signWithGoogle.mutate()}
            disabled={signWithGoogle.isLoading}
          >
            <i className="fi fi-brands-google text-base" />
            Continue with Google
          </Button>

          <Button
            variant={'outline'}
            size={'md'}
            onClick={() => signWithGithub.mutate()}
            disabled={signWithGithub.isLoading}
          >
            <i className="fi fi-brands-github text-base" />
            Continue with Github
          </Button>
        </div>
      </div>
    </section>
  )
}

export { SigninForm }
