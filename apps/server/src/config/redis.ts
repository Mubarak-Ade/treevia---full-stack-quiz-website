import env from "./env.js"
import { createClient } from "redis"

const redis = createClient({
    socket: {
        host: env.REDIS_HOST || "localhost",
        port: +env.REDIS_PORT || 6379,
    },
    password: env.REDIS_PASSWORD,
})


redis.on("error", (error: Error) => {
    console.log(`Redis connection error ${error.message}`)
})

await redis.connect()

export default redis