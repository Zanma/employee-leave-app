"use client";

import { useState } from "react";
import { LeaveRequest } from "@/types";
import { Employee } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckCircle2, XCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface LeaveRequestTableProps {
  requests: LeaveRequest[];
  employees: Employee[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isAdmin?: boolean;
}

type ConfirmAction = { id: string; type: "approve" | "reject" } | null;

export function LeaveRequestTable({
  requests,
  employees,
  onApprove,
  onReject,
  isAdmin = true,
}: LeaveRequestTableProps) {
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const getEmployeeName = (employeeId: string) => {
    return (
      employees.find((e) => e.id === employeeId)?.name ?? "Unknown Employee"
    );
  };

  const handleConfirm = () => {
    if (!confirmAction) return;
    if (confirmAction.type === "approve") {
      onApprove(confirmAction.id);
      toast.success("Leave request approved");
    } else {
      onReject(confirmAction.id);
      toast.success("Leave request rejected");
    }
    setConfirmAction(null);
  };

  if (requests.length === 0) {
    return (
      <EmptyState
        icon={CalendarDays}
        title="No leave requests found"
        description="Create a new leave request or adjust your filter."
      />
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead className="hidden sm:table-cell">Period</TableHead>
              <TableHead className="hidden lg:table-cell">Reason</TableHead>
              <TableHead>Status</TableHead>
              {isAdmin && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{getEmployeeName(req.employeeId)}</p>
                    <p className="text-xs text-muted-foreground sm:hidden">
                      {formatDate(req.startDate)} – {formatDate(req.endDate)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                  {formatDate(req.startDate)} – {formatDate(req.endDate)}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground max-w-xs truncate">
                  {req.reason}
                </TableCell>
                <TableCell>
                  <StatusBadge status={req.status} />
                </TableCell>
                {isAdmin && (
                  <TableCell className="text-right">
                    {req.status === "PENDING" && (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          title="Approve"
                          onClick={() =>
                            setConfirmAction({ id: req.id, type: "approve" })
                          }
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Reject"
                          onClick={() =>
                            setConfirmAction({ id: req.id, type: "reject" })
                          }
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ConfirmDialog
        open={!!confirmAction}
        title={
          confirmAction?.type === "approve"
            ? "Approve Leave Request"
            : "Reject Leave Request"
        }
        description={
          confirmAction?.type === "approve"
            ? "Are you sure you want to approve this leave request?"
            : "Are you sure you want to reject this leave request?"
        }
        confirmLabel={
          confirmAction?.type === "approve" ? "Approve" : "Reject"
        }
        variant={confirmAction?.type === "reject" ? "destructive" : "default"}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmAction(null)}
      />
    </>
  );
}
