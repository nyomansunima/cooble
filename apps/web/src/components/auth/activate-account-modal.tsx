'use client'

import { Alert, AlertContent, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import * as React from 'react'

export const ActivateAccountModal: React.FC = (): React.ReactElement => {
  const [open, setOpen] = React.useState<boolean>(true)
  const router = useRouter()

  const sendVerificationEmail = useMutation(
    async () => {
      return
    },
    {
      onSuccess: () => {
        router.push('/verify-email')
      },
    },
  )

  return (
    <>
      {open && (
        <div className="flex w-96 fixed top-10 right-10">
          <Alert>
            <button
              className="absolute right-4 top-4"
              onClick={() => {
                setOpen(false)
              }}
            >
              <i className="fi fi-rr-cross-small text-lg text-neutral-600" />
            </button>
            <AlertTitle>Activate your account</AlertTitle>
            <AlertContent className="flex flex-col">
              <p className="leading-normal">
                Verify your email address to activate your account before
                exploring.
              </p>
              <div className="flex justify-end mt-6">
                <Button
                  size={'base'}
                  variant={'secondary'}
                  onClick={() => sendVerificationEmail.mutate()}
                >
                  Activate account
                </Button>
              </div>
            </AlertContent>
          </Alert>
        </div>
      )}
    </>
  )
}
