import dotenv from 'dotenv'
dotenv.config();
export const {
    APP_PORT,
    MONGO_URI,
    TOKEN_KEY,
    EMAIL,
    BASEURL,
    PASS
} = process.env;