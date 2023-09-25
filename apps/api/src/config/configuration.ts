export const configuration = {
  auth: {
    jwt: {
      secret: Deno.env.get('AUTH_JWT_SECRET')!,
      accessExp: Deno.env.get('AUTH_ACCESS_EXP')!,
      refreshExp: Deno.env.get('AUTH_REFRESH_EXP')!,
    },
  },
  database: {
    xata: {
      branch: Deno.env.get('XATA_BRANCH')!,
      apiKey: Deno.env.get('XATA_API_KEY')!,
    },
  },
}
