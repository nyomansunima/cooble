export const configuration = {
  auth: {
    jwt: {
      secret: process.env.AUTH_JWT_SECRET!,
      accessExp: process.env.AUTH_ACCESS_EXP!,
      refreshExp: process.env.AUTH_REFRESH_EXP!,
    },
  },
  database: {
    xata: {
      branch: process.env.XATA_BRANCH!,
      apiKey: process.env.XATA_API_KEY!,
    },
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY!,
  },
  upstash: {
    redis: {
      url: process.env.UPSTASH_REDIS_URL!,
      token: process.env.UPSTASH_REDIS_TOKEN!,
    },
  },
}
