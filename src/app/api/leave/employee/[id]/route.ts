import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const leaves = await prisma.leaveRequest.findMany({
      where: { employeeId: id },
      include: { employee: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(leaves);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leaves" }, { status: 500 });
  }
}
