import { createInsertSchema } from "drizzle-typebox";

import { table } from "@/db/schema";
import Elysia, { t } from "elysia";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";

const _createBook = createInsertSchema(table.bookTable, {
  author: t.String({
    description: "Author of the book",
    examples: "Edgar Allan Poe",
  }),

  genre: t.String({
    description: "Genre of the book",
    examples: "Terror",
  }),
  title: t.String({
    description: "Title of the book",
    examples: "The Black Cat",
  }),
});

const createBook = t.Omit(_createBook, ["id"]);

export const book = new Elysia({
  prefix: "book",
  tags: ["book"],
})
  .get(
    "/",
    async () => {
      const books = await db.query.bookTable.findMany();
      return books;
    },
    {
      detail: {
        summary: "List all books",
      },
    }
  )
  .post(
    "/",
    async ({ body }) => {
      const bookCreated = await db
        .insert(table.bookTable)
        .values({
          ...body,
        })
        .returning();

      return bookCreated;
    },
    {
      body: createBook,
      detail: {
        summary: "Create a book"
      },
    }
  )
  .get(
    "/:id",
    async ({ params }) => {
      const book = await db.query.bookTable.findFirst({
        where: (bookTable, { eq }) => eq(bookTable.id, params.id),
      });

      return book;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        summary: "Get specific book by id"
      },
    }
  )
  .put(
    "/:id",
    async ({ params, body }) => {
      const book = await db
        .update(table.bookTable)
        .set(body)
        .where(eq(table.bookTable.id, params.id))
        .returning();

      return book;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: createBook,
      detail: {
        summary: "Update specific book by id"
      },
    }
  )
  .delete(
    "/:id",
    async ({ params }) => {
      const book = await db
        .delete(table.bookTable)
        .where(eq(table.bookTable.id, params.id));

      return book;
    },
    {
      detail: {
        summary: "Delete specific book by id"
      },
    }
  );
