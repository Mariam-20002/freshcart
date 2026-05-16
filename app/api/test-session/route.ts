import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/app/Auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(nextAuthConfig);

  return NextResponse.json({
    session,
    isLoggedIn: Boolean(session),
  });
}
