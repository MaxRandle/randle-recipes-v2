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
  author: integer("author").references(() => UsersTable.id),

  // tables not yet created:
  // categories
  // dietary flags: "GF", "DF", "VG", "VE", "KE"
  // tags
  // favourites
});

export type Recipe = InferSelectModel<typeof RecipesTable>;
export type NewRecipe = InferInsertModel<typeof RecipesTable>;
