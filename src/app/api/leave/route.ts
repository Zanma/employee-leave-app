import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const leaves = await prisma.leaveRequest.findMany({
      include: { employee: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(leaves);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leaves" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const leave = await prisma.leaveRequest.create({
      data: {
        employeeId: body.employeeId,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        reason: body.reason,
        status: body.status || "PENDING",
      },
    });
    return NextResponse.json(leave, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create leave" }, { status: 500 });
  }
}
