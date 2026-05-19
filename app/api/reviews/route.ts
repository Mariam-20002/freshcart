import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      error: "Unauthorized",
      status: 401,
    });
  }

  const body = await req.json();

  const { productId, review, rating } = body;

  const data = await fetch(`${process.env.API}products/${productId}/reviews`, {
    method: "POST",

    headers: {
      token: token.token,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      review,
      rating,
    }),
  });

  const payload = await data.json();

  if (!data.ok) {
    return NextResponse.json({
      error: data.statusText,
      status: data.status,
    });
  }

  return NextResponse.json(payload);
}
