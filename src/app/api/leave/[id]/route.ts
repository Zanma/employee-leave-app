import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const leave = await prisma.leaveRequest.findUnique({
      where: { id },
      include: { employee: true },
    });
    if (!leave) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(leave);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leave" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const leave = await prisma.leaveRequest.update({
      where: { id },
      data: {
        ...body,
        ...(body.startDate && { startDate: new Date(body.startDate) }),
        ...(body.endDate && { endDate: new Date(body.endDate) }),
      },
    });
    return NextResponse.json(leave);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update leave" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.leaveRequest.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete leave" }, { status: 500 });
  }
}
