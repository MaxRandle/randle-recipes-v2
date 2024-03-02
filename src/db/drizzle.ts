import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { type NewUser, type User, UsersTable } from "@db/tables/Users";

// Connect to Vercel Postgres
export const db = drizzle(sql);

export const createUsersTable = async () => {
  await sql.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Created users table");
};

export const seedUsersTable = async () => {
  const newUsers: NewUser[] = [
    {
      email: "maxrandle95@gmail.com",
      name: "Jane Doe",
    },
  ];

  const insertedUsers: User[] = await db
    .insert(UsersTable)
    .values(newUsers)
    .returning();

  console.log(`Seeded ${insertedUsers.length} users`);
};
