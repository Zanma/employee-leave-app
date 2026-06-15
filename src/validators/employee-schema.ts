import { z } from "zod";
import { MIN_NAME_LENGTH } from "@/constants";

export const employeeSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(MIN_NAME_LENGTH, `Name must be at least ${MIN_NAME_LENGTH} characters`),
  department: z.string().min(1, "Department is required"),
  position: z.string().min(1, "Position is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["admin", "employee"]),
  leaveBalance: z.coerce.number().min(0, "Leave balance cannot be negative").optional(),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
