import { Resend } from 'resend'
import { configuration } from './configuration'

/**
 * Resend client to allow
 * access the api and all service in resend
 * including to send, and configuration
 */
export const resendClient = new Resend(configuration.resend.apiKey)
