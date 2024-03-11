import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgEnum, pgTable, serial } from "drizzle-orm/pg-core";

const symbolEnum = pgEnum("SYMBOL", ["GF", "DF", "VG", "VE", "KE"]);

export const DietaryFlagsTable = pgTable("dietary_flags", {
  id: serial("id").primaryKey(),
  symbol: symbolEnum("symbol").notNull().unique(),
});

export type DietaryFlag = InferSelectModel<typeof DietaryFlagsTable>;
export type NewDietaryFlag = InferInsertModel<typeof DietaryFlagsTable>;

export const CREATE_DIETARY_FLAGS_TABLE_QUERY = `
  CREATE TYPE SYMBOL AS ENUM ('GF', 'DF', 'VG', 'VE', 'KE');

  CREATE TABLE IF NOT EXISTS dietary_flags (
    id SERIAL PRIMARY KEY,
    symbol SYMBOL UNIQUE NOT NULL
  );
`;

export const DROP_DIETARY_FLAGS_TABLE_QUERY = `
  DROP TABLE IF EXISTS dietary_flags;
  DROP TYPE IF EXISTS SYMBOL;
`;
