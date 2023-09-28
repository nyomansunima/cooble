import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { mergeStyle } from '~/utils/helpers'

const alertVariants = cva(
  'relative w-full rounded-2xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-black',
  {
    variants: {
      variant: {
        default: 'bg-light border-neutral-100',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={mergeStyle(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={mergeStyle(
      'font-medium leading-none tracking-tight text-[16px]',
      className,
    )}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertContent = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={mergeStyle(
      'text-sm text-neutral-700 mt-3 [&_p]:leading-relaxed',
      className,
    )}
    {...props}
  />
))
AlertContent.displayName = 'AlertContent'

export { Alert, AlertTitle, AlertContent }
