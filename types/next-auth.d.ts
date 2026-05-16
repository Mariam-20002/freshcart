/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";
interface ApplicationUser {
  name: string;
  email: string;
  id: string;
  token: string;
}

declare module "next-auth" {
  interface User {
    name: string;
    email: string;
    id: string;
    token: string;
  }

  interface Session {
    user: ApplicationUser;
    token: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends ApplicationUser {
    /** OpenID ID Token */
    idToken?: string;
  }
}
