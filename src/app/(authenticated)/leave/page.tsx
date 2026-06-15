"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { LeaveRequestTable } from "@/components/leave/LeaveRequestTable";
import { LeaveStatusFilter } from "@/components/leave/LeaveStatusFilter";
import { buttonVariants } from "@/components/ui/button";
import { useLeaveRequests } from "@/hooks/use-leave-requests";
import { useAuth } from "@/hooks/use-auth";
import { useEmployees } from "@/hooks/use-employees";
import { Plus } from "lucide-react";

export default function LeavePage() {
  const { session } = useAuth();
  const isAdmin = session?.role === "admin";
  const {
    requests,
    isLoading,
    statusFilter,
    setStatusFilter,
    approve,
    reject,
  } = useLeaveRequests();

  const { allEmployees } = useEmployees();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Requests"
        description="Manage and review employee leave requests"
        action={
          <Link href="/leave/new" className={buttonVariants()}>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Link>
        }
      />

      <div className="space-y-4">
        <LeaveStatusFilter value={statusFilter} onChange={setStatusFilter} />
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground animate-pulse">
            Loading...
          </div>
        ) : (
          <LeaveRequestTable
            requests={requests}
            employees={allEmployees}
            onApprove={approve}
            onReject={reject}
            isAdmin={isAdmin}
          />
        )}
      </div>
    </div>
  );
}
