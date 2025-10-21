import dotenv from "dotenv";
dotenv.config();

export const OMDB_API_KEY = process.env.OMDB_API_KEY as string;
export const OMDB_BASE_URL = process.env.OMDB_BASE_URL as string;
export const PORT = process.env.PORT || 5000;