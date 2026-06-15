"use client";

import { useEffect, useState } from "react";
import { StatCard } from "./StatCard";
import { useAuth } from "@/hooks/use-auth";
import { EmployeeStorageService } from "@/services/employee-storage";
import { LeaveStorageService } from "@/services/leave-storage";
import { Users, Clock, CheckCircle2, XCircle, CalendarDays } from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";

interface DashboardData {
  totalEmployees: number;
  pendingLeaves: number;
  approvedLeaves: number;
  rejectedLeaves: number;
  remainingLeave?: number;
  totalLeaveAllowance?: number;
}

export function DashboardStats() {
  const { session } = useAuth();
  const isAdmin = session?.role === "admin";

  const [data, setData] = useState<DashboardData>({
    totalEmployees: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const allLeaves = await LeaveStorageService.getAll();
      
      if (isAdmin) {
        const totalEmployees = await EmployeeStorageService.count();
        setData({
          totalEmployees,
          pendingLeaves: allLeaves.filter((r) => r.status === "PENDING").length,
          approvedLeaves: allLeaves.filter((r) => r.status === "APPROVED").length,
          rejectedLeaves: allLeaves.filter((r) => r.status === "REJECTED").length,
        });
      } else if (session?.username) {
        const allEmp = await EmployeeStorageService.getAll();
        const me = allEmp.find((e) => e.username === session.username);
        
        if (me) {
          const myLeaves = allLeaves.filter((r) => r.employeeId === me.id);
          const used = myLeaves
            .filter((r) => r.status === "APPROVED" || r.status === "PENDING")
            .reduce((total, r) => {
              const start = parseISO(r.startDate);
              const end = parseISO(r.endDate);
              const days = differenceInDays(end, start) + 1;
              return total + (days > 0 ? days : 0);
            }, 0);
            
          setData({
            totalEmployees: 0,
            totalLeaveAllowance: me.leaveBalance ?? 0,
            remainingLeave: Math.max(0, (me.leaveBalance ?? 0) - used),
            pendingLeaves: myLeaves.filter((r) => r.status === "PENDING").length,
            approvedLeaves: myLeaves.filter((r) => r.status === "APPROVED").length,
            rejectedLeaves: myLeaves.filter((r) => r.status === "REJECTED").length,
          });
        }
      }
    };

    loadData();

    const handleStorage = () => loadData();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [isAdmin, session?.username]);

  if (isAdmin) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={data.totalEmployees}
          icon={Users}
          variant="default"
        />
        <StatCard
          title="Pending Leaves"
          value={data.pendingLeaves}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Approved Leaves"
          value={data.approvedLeaves}
          icon={CheckCircle2}
          variant="success"
        />
        <StatCard
          title="Rejected Leaves"
          value={data.rejectedLeaves}
          icon={XCircle}
          variant="danger"
        />
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Leave Allowance"
        value={data.totalLeaveAllowance ?? 0}
        icon={CalendarDays}
        variant="default"
      />
      <StatCard
        title="Remaining Leave"
        value={data.remainingLeave ?? 0}
        icon={CheckCircle2}
        variant="success"
      />
      <StatCard
        title="Pending Requests"
        value={data.pendingLeaves}
        icon={Clock}
        variant="warning"
      />
      <StatCard
        title="Approved Leaves"
        value={data.approvedLeaves}
        icon={CheckCircle2}
        variant="default"
      />
    </div>
  );
}
