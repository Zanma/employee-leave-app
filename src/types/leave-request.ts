export type LeaveRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export type LeaveRequest = {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveRequestStatus;
};
