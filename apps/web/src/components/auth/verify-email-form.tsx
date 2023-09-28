'use client'

import { Button } from '@components/ui/button'
import Image from 'next/image'
import * as React from 'react'
import { useMutation } from '@tanstack/react-query'
import useToastStore from '~/stores/toast-store'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'

const formSchema = z.object({
  token: z.string().min(6, 'Token at least must be 6 characthers'),
})

const VerifyEmailForm: React.FC = (): React.ReactElement => {
  const { showToast } = useToastStore()
  const secureEmailAddress = 'n****a@gmail.com'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: '',
    },
  })

  const veryToken = useMutation(async (data: z.infer<typeof formSchema>) => {})

  const resendToken = useMutation(async () => {})

  return (
    <section className="flex flex-col h-full w-full laptop:w-1/2 justify-center px-5 laptop:px-28 animate-in duration-700 slide-in-from-bottom-20">
      <div className="flex flex-col laptop:w-10/12">
        <Image
          src={'/images/logo.png'}
          height={64}
          width={64}
          alt="Cooble"
          className="object-cover"
          quality={100}
        />

        <h2 className="text-4xl font-medium !leading-tight  mt-5">
          Activate your account.
        </h2>
        <p className="text-neutral-700 mt-4 leading-relaxed">
          We’re send you verification code to{' '}
          <span className="font-medium">{secureEmailAddress}</span>. Please
          check your inbox, then start activate your account. Remember this code
          is only working for about 60 seconds
        </p>

        <div className="flex flex-col mt-6 gap-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => veryToken.mutate(data))}
            >
              <FormField
                name="token"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Your verification token" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  variant={'primary'}
                  size={'md'}
                  type="submit"
                  disabled={veryToken.isLoading}
                >
                  {veryToken.isLoading ? (
                    <>
                      Activating account
                      <i className="fi fi-rr-spinner animate-spin text-base absolute right-4" />
                    </>
                  ) : (
                    <>
                      Activate account
                      <i className="fi fi-rr-arrow-right text-base absolute right-4" />
                    </>
                  )}
                </Button>

                <span className="flex justify-end gap-1 text-neutral-600">
                  Didn't get code?{' '}
                  <button
                    type="button"
                    className="flex font-medium text-black"
                    disabled={resendToken.isLoading}
                    onClick={() => {
                      resendToken.mutate()
                    }}
                  >
                    Resend
                  </button>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}

export { VerifyEmailForm }
