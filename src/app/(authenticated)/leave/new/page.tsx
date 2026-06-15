"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { LeaveRequestForm } from "@/components/leave/LeaveRequestForm";
import { LeaveStorageService } from "@/services/leave-storage";
import { LeaveRequestFormData } from "@/validators";
import { useEmployees } from "@/hooks/use-employees";
import { useAuth } from "@/hooks/use-auth";
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
import { ArrowLeft, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewLeavePage() {
  const router = useRouter();
  const { allEmployees, isLoading } = useEmployees();
  const { session } = useAuth();
  
  const isAdmin = session?.role === "admin";
  const filteredEmployees = isAdmin 
    ? allEmployees 
    : allEmployees.filter((emp) => emp.username === session?.username);

  const handleSubmit = async (data: LeaveRequestFormData) => {
    try {
      await LeaveStorageService.create({ ...data, status: "PENDING" });
      toast.success("Leave request submitted successfully");
      router.push("/leave");
    } catch (error) {
      logger.error("Failed to submit leave request", error, "NewLeavePage");
      toast.error("Failed to submit leave request. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="New Leave Request"
        description="Submit a leave request for an employee"
        action={
          <Link href="/leave" className={buttonVariants({ variant: "outline" })}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        }
      />

      {allEmployees.length === 0 ? (
        <Card className="max-w-lg">
          <CardContent className="flex flex-col items-center py-10 text-center gap-3">
            <div className="rounded-full bg-muted p-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">No Employees Found</h3>
            <p className="text-sm text-muted-foreground">
              You need to add at least one employee before creating a leave
              request.
            </p>
            <Link href="/employees/new" className={cn(buttonVariants(), "mt-2")}>Add Employee</Link>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Leave Request Details</CardTitle>
            <CardDescription>
              Fill in the information below to submit a leave request.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeaveRequestForm employees={filteredEmployees} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
