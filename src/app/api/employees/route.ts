import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        leaveRequests: {
          where: {
            status: { in: ["APPROVED", "PENDING"] },
          },
        },
      },
    });

    const employeesWithBalance = employees.map((emp) => {
      const used = emp.leaveRequests.reduce((total, r) => {
        const diff =
          Math.ceil(
            (r.endDate.getTime() - r.startDate.getTime()) / (1000 * 60 * 60 * 24)
          ) + 1;
        return total + (diff > 0 ? diff : 0);
      }, 0);
      
      const { leaveRequests, ...rest } = emp;
      return {
        ...rest,
        remainingLeave: Math.max(0, emp.leaveBalance - used),
      };
    });

    return NextResponse.json(employeesWithBalance);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const employee = await prisma.employee.create({
      data: body,
    });
    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
  }
}
