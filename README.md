# API Starter with Elysia

This is a project API starter that uses:
- Elysia
- `@elysia/swagger`
- Bun
- Drizzle ORM
- `drizzle-kit`
- `drizzle-typebox`

## Getting Started
To get started clone this repository, and install dependencies
```bash
bun install
```

> [!NOTE]
> It is worth mentioning that if still using drizzle and bun sql capabilities, only `pg` was used to generate auth tables(user, verification, session, account), and not anymore.  

## Scripts
dev server
```bash
bun run dev
```
build server
```bash
bun run build
```

Open http://localhost:3000/swagger with your browser to see the result.