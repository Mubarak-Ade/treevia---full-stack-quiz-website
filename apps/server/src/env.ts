import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
    PORT: port(),
    MONGO_URI: str(),
    MONGO_URI_PROD: str(),
    ACCESS_SECRET: str(),
    REFRESH_SECRET: str(),
    NODE_ENV: str(),
    CLIENT_URL: str()
})