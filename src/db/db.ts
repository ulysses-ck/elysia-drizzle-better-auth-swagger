import { drizzle } from "drizzle-orm/bun-sql";
import { bookTable } from "./schema";
import * as authSchema from "./auth-schema";

export const db = drizzle({
  connection: Bun.env.DATABASE_URL,
  schema: {
    bookTable,
    ...authSchema,
  },
});
