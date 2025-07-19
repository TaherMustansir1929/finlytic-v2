import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const db_url = process.env.DATABASE_URL;
if (!db_url) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

export const sql = neon(db_url);
export const db = drizzle({ client: sql });
