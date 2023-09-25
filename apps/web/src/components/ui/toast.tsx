'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import useToastStore from '~/stores/toast-store'

/**
 * Render a toast and globally available
 * combine to use with `useToastStore`
 *
 * @returns {React.ReactElement}
 */
const Toast = (): React.ReactElement => {
  const { toast, isOpen, toggleToast } = useToastStore()

  return (
    <ToastPrimitives.Provider swipeDirection='right' duration={3000}>
      {toast && (
        <ToastPrimitives.Root
          className='flex bg-white p-4 rounded-lg border border-neutral-100 gap-3 relative data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-20 duration-700 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-out data-[swipe=end]:slide-out-to-top-20'
          data-test-id='toast'
          open={isOpen}
          onOpenChange={toggleToast}
        >
          <div className='flex justify-center items-center h-10 w-10 border border-neutral-100 rounded-xl'>
            <i className='fi fi-rr-bell text-xl' />
          </div>

          <div className='flex flex-1 flex-col gap-1'>
            <ToastPrimitives.Title className='text-base font-medium'>
              {toast.title}
            </ToastPrimitives.Title>
            {toast.description && (
              <ToastPrimitives.Description className='text-sm text-neutral-600'>
                {toast.description}
              </ToastPrimitives.Description>
            )}
            {toast.actions && (
              <ToastPrimitives.Action asChild altText='action'>
                <div className='flex gap-2 mt-2'>
                  {toast.actions}
                </div>
              </ToastPrimitives.Action>
            )}
            <ToastPrimitives.Close className='absolute top-3 right-3 h-4 w-4 rounded-md bg-neutral-100 transition-all duration-500 hover:scale-105'>
              <i className='fi fi-rr-cross-small' />
            </ToastPrimitives.Close>
          </div>
        </ToastPrimitives.Root>
      )}
      <ToastPrimitives.Viewport className='[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none' />
    </ToastPrimitives.Provider>
  )
}

export default Toast
