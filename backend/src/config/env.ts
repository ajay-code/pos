import { config } from "dotenv";
config();
export const APP_SECRET = process.env.APP_SECRET || "secret";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const APP_URL = process.env.APP_URL || "localhost:3000";
export const DB_URL = process.env.DB_URL || "mongodb://localhost:27017";
export const PORT = process.env.PORT || "3000";

export default {
  APP_SECRET,
  NODE_ENV,
  APP_URL,
  DB_URL,
  PORT,
};
