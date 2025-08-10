import 'dotenv/config'
import Redis from 'ioredis'
export const redis = new Redis(process.env.REDIS_URL!)
export async function redisPing() {
  const r = await redis.ping()
  return r === 'PONG'
}