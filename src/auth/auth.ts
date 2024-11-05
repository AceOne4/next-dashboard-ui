import NextAuth, { NextAuthConfig } from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "../lib/zod";
import { hashPassword } from "@/lib/helpers";
import { getUSerLogin } from "@/lib/service-data";
// Your own logic for dealing with plaintext password strings; be careful!

export type UserRole = "admin" | "teacher" | "student" | "parent";
const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
        role: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const { email, password, role } = await signInSchema.parseAsync(
            credentials
          );

          // logic to salt and hash password
          const pwHash = await hashPassword(password);

          // logic to verify if the user exists
          const userRole: UserRole = role;

          user = await getUSerLogin(email, pwHash, userRole);

          if (!user) {
            throw new Error("User not found.");
          }

          // return JSON object with the user data
          return {
            ...user,
            id: user._id,
            role,
          };
        } catch (error) {
          console.error("Sign-in error:", error);
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },

    //to use id everywhere instead of detching em everywehre
    async session({ session, token }) {
      session.user.id = token.sub !== undefined ? token.sub : "";
      session.user.role = token.role !== undefined ? token.role : "";

      return session;
    },
    async jwt({ token, user }) {
      // Persist the user data into token

      if (user) {
        token.sub = user.id; // Use `sub` to hold the user ID
        token.role = user.role; // Attach role to token
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
