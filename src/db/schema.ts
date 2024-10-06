import {
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  is_complete: boolean("is_complete").default(false).notNull(),
  user_id: varchar("user_id", { length: 255 }).notNull(), // Clerk user ID
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export type SelectTodos = typeof todos.$inferSelect;
export type InsertTodos = typeof todos.$inferInsert;
