import { LeaveRequest } from "@/types";

export const LeaveStorageService = {
  async getAll(): Promise<LeaveRequest[]> {
    const res = await fetch("/api/leave", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data;
  },

  async getById(id: string): Promise<LeaveRequest | undefined> {
    const res = await fetch(`/api/leave/${id}`, { cache: "no-store" });
    if (!res.ok) return undefined;
    return res.json();
  },

  async getByEmployeeId(employeeId: string): Promise<LeaveRequest[]> {
    const res = await fetch(`/api/leave/employee/${employeeId}`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  },

  async create(data: Omit<LeaveRequest, "id" | "createdAt" | "updatedAt">): Promise<LeaveRequest> {
    const res = await fetch("/api/leave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create leave request");
    return res.json();
  },

  async update(id: string, data: Partial<Omit<LeaveRequest, "id" | "createdAt" | "updatedAt">>): Promise<LeaveRequest> {
    const res = await fetch(`/api/leave/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update leave request");
    return res.json();
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`/api/leave/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete leave request");
  },

  async deleteByEmployeeId(employeeId: string): Promise<void> {
    // handled by Cascade delete in Prisma DB schema!
  },

  async updateStatus(id: string, status: LeaveRequest["status"]): Promise<LeaveRequest> {
    const res = await fetch(`/api/leave/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update leave status");
    return res.json();
  },
};
