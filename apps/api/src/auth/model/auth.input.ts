import { z } from 'zod'

export const googleAuthInputSchema = z.object({
  accessToken: z.string().min(1, 'Access token cannot be empty'),
  idToken: z.string().min(1, 'ID Token cannot be empty'),
})

export const githubAuthInputSchema = z.object({
  accessToken: z.string().min(1, 'Access token cannot be empty'),
})

export interface GoogleAuthInput
  extends z.infer<typeof googleAuthInputSchema> {}

export interface GithubAuthInput
  extends z.infer<typeof githubAuthInputSchema> {}
