import { Badge } from "@/components/ui/badge";
import { LeaveRequestStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  LeaveRequestStatus,
  { label: string; className: string }
> = {
  PENDING: {
    label: "Pending",
    className:
      "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200",
  },
  APPROVED: {
    label: "Approved",
    className:
      "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200",
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
  },
};

interface StatusBadgeProps {
  status: LeaveRequestStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  );
}
