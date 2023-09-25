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
