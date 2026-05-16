import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getTokenFn() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("__Secure-next-auth.session-token")?.value ||
    cookieStore.get("next-auth.session-token")?.value;

  if (!token) return null;

  const decoded = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token,
  });

  return decoded?.token;
}
