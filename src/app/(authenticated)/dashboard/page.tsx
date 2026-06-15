"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of employees and leave requests"
      />
      <DashboardStats />
    </div>
  );
}
