import { Elysia } from "elysia";
import { book } from "./modules/book";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(swagger())
  .use(book)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
