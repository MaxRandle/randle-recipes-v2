import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

// Connect to Vercel Postgres
export const db = drizzle(sql);
