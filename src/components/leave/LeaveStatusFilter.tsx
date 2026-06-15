"use client";

import { StatusFilter } from "@/hooks/use-leave-requests";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const filters: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

interface LeaveStatusFilterProps {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
}

export function LeaveStatusFilter({ value, onChange }: LeaveStatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={value === filter.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(filter.value)}
          className={cn(
            "transition-all",
            filter.value === "PENDING" &&
              value === "PENDING" &&
              "bg-amber-600 hover:bg-amber-700",
            filter.value === "APPROVED" &&
              value === "APPROVED" &&
              "bg-emerald-600 hover:bg-emerald-700",
            filter.value === "REJECTED" &&
              value === "REJECTED" &&
              "bg-red-600 hover:bg-red-700"
          )}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
