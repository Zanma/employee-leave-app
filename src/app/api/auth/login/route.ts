export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import { VALID_CREDENTIALS } from "@/constants";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Check static admin credentials
    if (
      username === VALID_CREDENTIALS.USERNAME &&
      password === VALID_CREDENTIALS.PASSWORD
    ) {
      const token = await signToken({ username, role: "admin" });
      const response = NextResponse.json({ success: true, user: { username, role: "admin" } });
      response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 86400 });
      return response;
    }

    // Check database for employee
    const employee = await prisma.employee.findFirst({
      where: {
        username,
        password,
      },
    });

    if (!employee) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signToken({ username: employee.username, role: employee.role, id: employee.id });
    const response = NextResponse.json({ success: true, user: { username: employee.username, role: employee.role } });
    response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 86400 });
    return response;

  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
