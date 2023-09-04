import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { signJwtToken } from "@/lib/jwt";
import { CurrentUser } from "@/types";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@gomail.om",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        await db.connect();

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid input");
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          throw new Error("Invalid input");
        } else {
          const { password, ...currentUser }: CurrentUser = user._doc;

          const accessToken = signJwtToken(currentUser, { expiresIn: "5d" });

          return {
            ...currentUser,
            accessToken,
          };
        }
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
};

