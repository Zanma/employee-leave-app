export type Employee = {
  id: string;
  name: string;
  department: string;
  position: string;
  leaveBalance?: number;
  username: string;
  password: string;
  role: "admin" | "employee";
  remainingLeave?: number;
};
