import { Employee } from "@/types";

export const EmployeeStorageService = {
  async getAll(): Promise<Employee[]> {
    const res = await fetch("/api/employees", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  },

  async getById(id: string): Promise<Employee | undefined> {
    const res = await fetch(`/api/employees/${id}`, { cache: "no-store" });
    if (!res.ok) return undefined;
    return res.json();
  },

  async create(data: Omit<Employee, "id">): Promise<Employee> {
    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create employee");
    return res.json();
  },

  async update(id: string, data: Partial<Omit<Employee, "id">>): Promise<Employee> {
    const res = await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update employee");
    return res.json();
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`/api/employees/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete employee");
  },

  async count(): Promise<number> {
    const res = await fetch("/api/employees/count", { cache: "no-store" });
    if (!res.ok) return 0;
    const data = await res.json();
    return data.count;
  },
};
