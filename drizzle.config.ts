import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env" });

const db_url = process.env.DATABASE_URL;
if (!db_url) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: db_url,
  },
  verbose: true,
  strict: true,
});
