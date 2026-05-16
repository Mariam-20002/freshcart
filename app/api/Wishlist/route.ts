import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  console.log("token from handler", token);

  if (!token)
    return NextResponse.json({
      error: "unauthorized",
      status: 401,
    });

  const data = await fetch(`${process.env.API}wishlist`, {
    headers: {
      token: token.token,
      "Content-type": "application/json",
    },
  });

  const payload = await data.json();

  console.log("payload from handler", payload);

  if (!data.ok)
    return NextResponse.json({
      error: data.statusText,
      status: data.status,
    });

  return NextResponse.json(payload);
}
