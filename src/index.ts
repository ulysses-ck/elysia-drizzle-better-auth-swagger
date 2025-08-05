import { Elysia } from "elysia";
import { book } from "./modules/book";
import { swagger } from "@elysiajs/swagger";
import { auth } from "./lib/auth";
import { OpenAPI } from "./lib/openapi";

const app = new Elysia()
  .mount(auth.handler)
  .use(
    swagger({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),        
        info: {
          title: "Book Backend App",
          version: "1.0.0",
        },
      },
    })
  )
  .use(book)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
