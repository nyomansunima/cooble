import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * ## mergeStyle
 *
 * merge the style and give them authority
 * so no conflix happer
 *
 * @param input class input to merge the style
 * @returns {string}
 */
export function mergeStyle(...input: ClassValue[]) {
  return twMerge(clsx(input))
}

/**
 * Display email with secure way.
 * Replace the mutual chars with special chars
 * @param email email want to display in secure
 * @returns {string}
 */
export function secureEmailDisplay(email: string): string {
  if (email.includes('@')) {
    const [username, domain] = email.split('@')
    const maskedUsername =
      username.charAt(0) +
      '*'.repeat(username.length - 2) +
      username.charAt(username.length - 1)
    const maskedEmail = maskedUsername + '@' + domain
    return maskedEmail
  } else {
    return email
  }
}
