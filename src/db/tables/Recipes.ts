import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { UsersTable } from "./Users";

const difficultyEnum = pgEnum("difficulty", ["1", "2", "3", "4", "5"]);

export const RecipesTable = pgTable("recipes", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  subtitle: text("subtitle").notNull(),
  intro: text("intro").notNull(),
  photos: text("photos").array().default([]).notNull(),
  videoUrl: text("videoUrl"),
  servings: integer("servings"),
  activePrepTime: integer("activePrepTime"),
  inactivePrepTime: integer("inactivePrepTime"),
  tips: text("tips").array().default([]).notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  equipment: text("equipment").array().default([]).notNull(),

  // relations
  author: integer("author")
    .references(() => UsersTable.id)
    .notNull(),

  // many-to-many:
  // categories
  // dietary flags
  // tags
  // favourites
});

export type Recipe = InferSelectModel<typeof RecipesTable>;
export type NewRecipe = Omit<
  InferInsertModel<typeof RecipesTable>,
  "slug" | "createdAt"
>;

export const CREATE_RECIPES_TABLE_QUERY = `
  CREATE TYPE DIFFICULTY AS ENUM ('1', '2', '3', '4', '5');

  CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    subtitle TEXT NOT NULL,
    intro TEXT NOT NULL,
    photos TEXT[] NOT NULL DEFAULT '{}',
    "videoUrl" TEXT,
    servings INTEGER,
    "activePrepTime" INTEGER,
    "inactivePrepTime" INTEGER,
    tips TEXT[] NOT NULL DEFAULT '{}',
    difficulty DIFFICULTY NOT NULL,
    equipment TEXT[] NOT NULL DEFAULT '{}',

    author INTEGER REFERENCES users(id)
  );
`;

export const DROP_RECIPES_TABLE_QUERY = `
  DROP TABLE IF EXISTS recipes;
  DROP TYPE IF EXISTS DIFFICULTY;
`;
