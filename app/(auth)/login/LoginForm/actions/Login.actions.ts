"use server";
import type { LoginSchemaType } from "../schema/Login.schema";
import { cookies } from "next/headers";

export async function LoginFn(formData: LoginSchemaType) {
  const data = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/signin",
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    },
  );

  if (!data.ok) throw new Error(data.statusText);

  const payload = await data.json();

  // cookies
  const cookie = await cookies();
  cookie.set("token", payload?.token, {
    expires: 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  return data.ok;
}
