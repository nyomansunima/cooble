import { Redis } from '@upstash/redis'
import { configuration } from './configuration'

/** Redis configuration client */
export const upstashRedis = new Redis({
  url: configuration.upstash.redis.url,
  token: configuration.upstash.redis.token,
})
