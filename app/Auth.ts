import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials login!!",
      credentials: {
        email: { label: "user email", placeholder: "email" },
        password: {},
      },
      authorize: async (credentials) => {
        const data = await fetch(`${process.env.API}/auth/signin`, {
          method: "post",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "content-type": "application/json",
          },
        });

        if (!data.ok) {
          throw new Error(data.statusText);
        }

        const payload = await data.json();
        const { name, email } = payload.user;
        const tokenData = jwtDecode<{ id: string }>(payload.token);

        return {
          id: tokenData.id,
          email,
          name,
          token: payload.token,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }

      return token;
    },

    session: ({ token, session }) => {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.token = token.token as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
