import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { account, user, session, verification } from "@/db/auth-schema";

export const auth = betterAuth({
  baseURL: Bun.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      account,
      user,
      session,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [openAPI()],
});
