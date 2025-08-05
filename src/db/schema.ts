import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const bookTable = pgTable("book", {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull(),
    author: text().notNull(),
    genre: text().notNull(),
})

export const table = {
    bookTable
} as const;

export type Table =  typeof table;

