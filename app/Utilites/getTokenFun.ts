import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getTokenFn() {
  // get cookies
  const cookieStore = await cookies();

  // get token from cookies
  const nextAuthToken = cookieStore.get("next-auth.session-token")?.value;

  // decode token
  const decodeCookie = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: nextAuthToken,
  });

  // return user token
  return decodeCookie?.token;
}
