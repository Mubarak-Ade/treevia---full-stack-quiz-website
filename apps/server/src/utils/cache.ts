import redis from "../config/redis.js"

export const getOrSetCache = async <T> (key: string, cb: () => Promise<T>, ttlSeconds = 60) => {
    const cached = await redis.get(key)

    if(cached) return JSON.parse(cached)

    const fresh = await cb()
    await redis.setEx(key, ttlSeconds, JSON.stringify(fresh))
    
    return fresh
}
    
export const invalidateCache = async (keys: string) => {
    await redis.del(keys)
}

export const invalidatePatternCache = async (pattern: string) => {
    const allKeys = await redis.keys(pattern)
    if (allKeys.length) await redis.del(allKeys)
}