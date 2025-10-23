import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
 import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";

// If your Prisma file is located elsewhere, you can change the path
  const prisma = new PrismaClient();
 export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: { 
        enabled: true, 
        requireEmailVerification: false,
      }, 
    socialProviders: {
        google: {
            enabled: true,
            prompt: "select_account", 
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            scope: ["profile", "email"],
            redirectUri: process.env.BETTER_AUTH_URL,
        },
    },
      plugins: [
        // Add more plugins here
        nextCookies()
      ],
});