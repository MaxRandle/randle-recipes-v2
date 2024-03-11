"use server";

import { db } from "@db";
import {
  CREATE_DIETARY_FLAGS_TABLE_QUERY,
  DietaryFlagsTable,
} from "@db/tables/DietaryFlags";
import {
  CREATE_USERS_TABLE_QUERY,
  UsersTable,
  newUserValidationSchema,
  type NewUser,
  type User,
} from "@db/tables/Users";
import { faker } from "@faker-js/faker";
import { sql } from "@vercel/postgres";
import { inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  DBError,
  State,
  handleDuplicateKeyError,
  handleZodValidationError,
  isDuplicateKeyError,
  isZodValidationError,
} from "./actions.utils";

export const createUsersTable = async () =>
  await sql.query(CREATE_USERS_TABLE_QUERY);

export const createNewUser = async (
  _prevState: State,
  formData: FormData,
): Promise<State<User>> => {
  try {
    // need to extract values from formData
    const newUserData = newUserValidationSchema.parse({
      email: formData.get("email"),
      name: formData.get("name"),
    });

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
    if (isZodValidationError(error)) {
      return handleZodValidationError(error as z.ZodError);
    }

    if (isDuplicateKeyError(error)) {
      return handleDuplicateKeyError(error as DBError);
    }

    return {
      status: "error",
      message: "An unknown error occurred",
    };
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

export const createDietaryFlagsTable = async () =>
  await sql.query(CREATE_DIETARY_FLAGS_TABLE_QUERY);

export const seedDietaryFlagsTable = async () => {
  const symbols = ["GF", "DF", "VG", "VE", "KE"] as const;

  const insertedFlags = await db
    .insert(DietaryFlagsTable)
    .values(symbols.map((symbol) => ({ symbol })))
    .returning();

  revalidatePath("/");

  return {
    status: "success",
    message: `Seeded ${insertedFlags.length} dietary flags`,
  };
};
