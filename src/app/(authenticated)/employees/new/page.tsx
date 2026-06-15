"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmployeeForm } from "@/components/employee/EmployeeForm";
import { EmployeeStorageService } from "@/services/employee-storage";
import { EmployeeFormData } from "@/validators";
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

export default function NewEmployeePage() {
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    if (session && session.role !== "admin") {
      router.replace("/employees");
      toast.error("You do not have permission to access this page.");
    }
  }, [session, router]);

  const handleSubmit = async (data: EmployeeFormData) => {
    try {
      await EmployeeStorageService.create(data);
      toast.success("Employee created successfully");
      router.push("/employees");
    } catch (error) {
      logger.error("Failed to create employee", error, "NewEmployeePage");
      toast.error("Failed to create employee. Please try again.");
    }
  };

  if (!session || session.role !== "admin") {
    return null;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Employee"
        description="Create a new employee record"
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
          <CardDescription>
            Fill in the information below to create a new employee.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmployeeForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
