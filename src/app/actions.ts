"use server";

import { db } from "@db";
import {
  UsersTable,
  userFormDataValidationSchema,
  type NewUser,
  type User,
} from "@db/tables/Users";
import { faker } from "@faker-js/faker";
import { sql } from "@vercel/postgres";
import { DrizzleError, inArray } from "drizzle-orm";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  State,
  handleDrizzlePostgresError,
  handleZodValidationError,
} from "./actions.utils";

export const createUsersTable = async () => {
  await sql.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export const createNewUser = async (
  _prevState: State,
  formData: FormData,
): Promise<State<User>> => {
  try {
    console.log("formData", formData);
    const newUserData = userFormDataValidationSchema.parse(formData);

    const insertedUsers = await db
      .insert(UsersTable)
      .values(newUserData)
      .returning();

    if (insertedUsers.length !== 1) {
      return {
        status: "error",
        message: `Created ${insertedUsers.length} users`,
      };
    }

    const [user] = insertedUsers;

    revalidatePath("/");

    return {
      status: "success",
      message: `User created with id ${user.id}`,
      result: user,
    };
  } catch (error) {
    // handle zod error
    if (error instanceof z.ZodError) {
      return handleZodValidationError(error);
    }

    // handle drizzle error
    // ...

    throw error;
  }
};

// Seed the users table with some dummy data
export const seedUsersTable = async (count: number): Promise<State> => {
  const newUsers: NewUser[] = [...Array(count)].map((_) => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
  }));

  const insertedUsers: User[] = await db
    .insert(UsersTable)
    .values(newUsers)
    .returning();

  revalidatePath("/");

  return {
    status: "success",
    message: `Seeded ${insertedUsers.length} users`,
  };
};

// Delete the first `count` users from the users table
export const deleteFirstUsers = async (count: number): Promise<State> => {
  const users = await db.select().from(UsersTable).limit(count);

  await db.delete(UsersTable).where(
    inArray(
      UsersTable.id,
      users.map((user) => user.id),
    ),
  );

  revalidatePath("/");

  return {
    status: "success",
    message: `Deleted ${users.length} users`,
  };
};
