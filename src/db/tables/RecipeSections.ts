import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { RecipesTable } from "./Recipes";

export const RecipeSectionsTable = pgTable("recipe_sections", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  intro: text("intro"),
  ingredients: text("ingredients").array().default([]).notNull(),
  method: text("method").notNull(),
  notes: text("notes"),
  photos: text("photos").array().default([]).notNull(),
  videoUrl: text("videoUrl"),
  recipeId: integer("recipe_id").references(() => RecipesTable.id),
});

export type RecipeSection = InferSelectModel<typeof RecipeSectionsTable>;
export type NewRecipeSection = InferInsertModel<typeof RecipeSectionsTable>;
