"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmployeeTable } from "@/components/employee/EmployeeTable";
import { EmployeeSearch } from "@/components/employee/EmployeeSearch";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useEmployees } from "@/hooks/use-employees";
import { Plus } from "lucide-react";

export default function EmployeesPage() {
  const { employees, isLoading, searchQuery, setSearchQuery, deleteEmployee } =
    useEmployees();
  const { session } = useAuth();
  const isAdmin = session?.role === "admin";

  const displayedEmployees = isAdmin
    ? employees
    : employees.filter((emp) => emp.role !== "admin");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="Manage your employee records"
        action={
          isAdmin ? (
            <Link href="/employees/new" className={buttonVariants()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Link>
          ) : undefined
        }
      />

      <div className="space-y-4">
        <EmployeeSearch value={searchQuery} onChange={setSearchQuery} />
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground animate-pulse">
            Loading...
          </div>
        ) : (
          <EmployeeTable employees={displayedEmployees} onDelete={deleteEmployee} isAdmin={isAdmin} />
        )}
      </div>
    </div>
  );
}
