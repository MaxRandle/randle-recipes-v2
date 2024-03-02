"use server";

import { sql } from "@vercel/postgres";
import { type NewUser, type User, UsersTable } from "@db/tables/Users";
import { faker } from "@faker-js/faker";
import { db } from "@db";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

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

// Seed the users table with some dummy data
export const seedUsersTable = async (count: number) => {
  const newUsers: NewUser[] = [...Array(count)].map((_, i) => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
  }));

  const insertedUsers: User[] = await db
    .insert(UsersTable)
    .values(newUsers)
    .returning();

  revalidatePath("/");

  console.log(`Seeded ${insertedUsers.length} users`);
};

export const deleteFirstUser = async () => {
  try {
    const users = await db.select().from(UsersTable).limit(1);

    if (users.length === 1) {
      const [firstUser] = users;
      await db.delete(UsersTable).where(eq(UsersTable.id, firstUser.id));

      revalidatePath("/");

      console.log(`Deleted user ${firstUser.id}`);
    } else {
      console.log("No users to delete");
    }
  } catch (e: any) {
    console.error(e);
  }
};
