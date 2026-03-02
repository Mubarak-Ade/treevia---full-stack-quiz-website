import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
    PORT: port(),
    MONGO_URI: str(),
    MONGO_URI_PROD: str(),
    SECRET: str()
})