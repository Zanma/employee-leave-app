"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Employee } from "@/types";
import { LeaveStorageService } from "@/services/leave-storage";
import { differenceInDays, parseISO } from "date-fns";
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
import { Users, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (id: string) => void;
  isAdmin?: boolean;
}

export function EmployeeTable({ employees, onDelete, isAdmin = true }: EmployeeTableProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    onDelete(deleteId);
    toast.success("Employee deleted successfully");
    setDeleteId(null);
  };

  if (employees.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No employees found"
        description="Add a new employee to get started or adjust your search."
      />
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Department</TableHead>
              <TableHead className="hidden md:table-cell">Position</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden md:table-cell">Leave Balance</TableHead>
              {isAdmin && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-muted-foreground sm:hidden">
                      {employee.department}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {employee.department}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {employee.position}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className="capitalize">
                    {employee.role}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {employee.role === "admin" ? (
                    <span className="text-muted-foreground">-</span>
                  ) : (
                    <Badge variant="secondary">
                      {employee.remainingLeave ?? employee.leaveBalance ?? 0} days
                    </Badge>
                  )}
                </TableCell>
                {isAdmin && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          router.push(`/employees/edit/${employee.id}`)
                        }
                        title="Edit employee"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(employee.id)}
                        title="Delete employee"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Employee"
        description="Are you sure you want to delete this employee? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
