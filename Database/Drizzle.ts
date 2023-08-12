import { sql } from "@vercel/postgres";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const cartColumns = pgTable("cartData", {
  product_title: varchar("product_title").notNull(),
  product_url: varchar("product_url").notNull(),
  product_price: integer("product_price").notNull(),
});

export const db = drizzle(sql);
