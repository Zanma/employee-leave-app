"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmployeeForm } from "@/components/employee/EmployeeForm";
import { EmployeeStorageService } from "@/services/employee-storage";
import { EmployeeFormData } from "@/validators";
import { Employee } from "@/types";
import { logger } from "@/lib/logger";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { session } = useAuth();

  useEffect(() => {
    if (session && session.role !== "admin") {
      router.replace("/employees");
      toast.error("You do not have permission to access this page.");
    }
  }, [session, router]);

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    EmployeeStorageService.getById(id).then(found => {
      if (!active) return;
      if (!found) {
        setNotFound(true);
      } else {
        setEmployee(found);
      }
    }).catch(() => {
      if (active) setNotFound(true);
    });
    return () => {
      active = false;
    };
  }, [id]);

  const handleSubmit = async (data: EmployeeFormData) => {
    try {
      await EmployeeStorageService.update(id, data);
      toast.success("Employee updated successfully");
      router.push("/employees");
    } catch (error) {
      logger.error("Failed to update employee", error, "EditEmployeePage");
      toast.error("Failed to update employee. Please try again.");
    }
  };

  if (session && session.role !== "admin") {
    return null;
  }

  if (notFound) {
    return (
      <div className="space-y-6">
        <PageHeader title="Employee Not Found" />
        <p className="text-muted-foreground">
          The employee you&apos;re looking for does not exist.
        </p>
        <Link href="/employees" className={buttonVariants()}>Back to Employees</Link>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-8 text-muted-foreground animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Employee"
        description={`Editing record for ${employee.name}`}
        action={
          <Link href="/employees" className={buttonVariants({ variant: "outline" })}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        }
      />

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Employee Details</CardTitle>
          <CardDescription>Update the employee information below.</CardDescription>
        </CardHeader>
        <CardContent>
          <EmployeeForm
            defaultValues={{
              name: employee.name,
              department: employee.department,
              position: employee.position,
              username: employee.username || "",
              password: employee.password || "",
              role: employee.role || "employee",
              leaveBalance: employee.leaveBalance ?? 0,
            }}
            onSubmit={handleSubmit}
            isEdit
          />
        </CardContent>
      </Card>
    </div>
  );
}
