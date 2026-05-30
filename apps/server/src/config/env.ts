import { cleanEnv, port, str } from 'envalid';

export default cleanEnv(process.env, {
    PORT: port(),
    MONGO_URI: str(),
    MONGO_URI_PROD: str(),
    ACCESS_SECRET: str(),
    REFRESH_SECRET: str(),
    NODE_ENV: str(),
    CLIENT_URL: str(),
    SMTP_HOST: str(),
    SMTP_PORT: port(),
    SMTP_USER: str(),
    SMTP_PASS: str(),
    REDIS_HOST: str(),
    REDIS_PORT: str(),
    REDIS_PASSWORD: str(),
});
