import { NextResponse, type NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const users = [
    { id: 1, name: "ali" },
    { id: 2, name: "ahmed" },
  ];

  return NextResponse.json({ users, status: 200 });
}
