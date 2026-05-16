"use server";

import { registerSchemaType } from "../schema/register.schema";

export async function registerFn(formData: registerSchemaType) {
  try {
    const data = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      },
    );

    const payload = await data.json();

    if (!data.ok) {
      throw new Error(payload.message || "Register failed");
    }

    return true;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}
