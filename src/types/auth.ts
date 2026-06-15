export type AuthSession = {
  username: string;
  role: "admin" | "employee";
  isAuthenticated: boolean;
  loginAt: string;
};

export type LoginCredentials = {
  username: string;
  password: string;
};
