export const STORAGE_KEYS = {
  EMPLOYEES: "els_employees",
  LEAVE_REQUESTS: "els_leave_requests",
  AUTH_SESSION: "els_auth_session",
} as const;

export const VALID_CREDENTIALS = {
  USERNAME: "admin",
  PASSWORD: "admin123",
} as const;

export const DEPARTMENTS = [
  "Engineering",
  "Human Resources",
  "Finance",
  "Marketing",
  "Operations",
  "Sales",
  "IT Support",
  "Legal",
] as const;

export const POSITIONS = [
  "Manager",
  "Senior Staff",
  "Staff",
  "Junior Staff",
  "Intern",
  "Team Lead",
  "Director",
  "Supervisor",
] as const;

export const LEAVE_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export const MIN_NAME_LENGTH = 3;
