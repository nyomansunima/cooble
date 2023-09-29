'use client'

import { Alert, AlertContent, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { getSession } from '@services/api/api-connection'
import { userService } from '@services/user-service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import * as React from 'react'
import useToastStore from '~/stores/toast-store'

export const ActivateAccountModal: React.FC = (): React.ReactElement => {
  const { showToast } = useToastStore()
  const router = useRouter()
  const userQuery = useQuery(['user'], getSession)

  const sendVerificationEmail = useMutation(userService.sendVerificationEmail, {
    onSuccess: () => {
      router.push('/verify-email')
    },
    onError: () => {
      showToast({
        title: 'Failed',
        description: 'Cannot send verification email, something bad happens',
      })
    },
  })

  return (
    <>
      {userQuery.data && !userQuery.data.user.verified && (
        <div className="flex w-96 fixed top-10 right-10">
          <Alert>
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
