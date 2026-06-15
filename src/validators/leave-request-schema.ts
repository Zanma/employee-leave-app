import { z } from "zod";

export const leaveRequestSchema = z
  .object({
    employeeId: z.string().min(1, "Employee is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    reason: z.string().min(1, "Reason is required"),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: "End date must be the same as or after start date",
      path: ["endDate"],
    }
  );

export type LeaveRequestFormData = z.infer<typeof leaveRequestSchema>;
