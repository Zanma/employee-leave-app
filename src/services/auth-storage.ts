import { AuthSession, LoginCredentials } from "@/types";
import { STORAGE_KEYS, VALID_CREDENTIALS } from "@/constants";
import { EmployeeStorageService } from "@/services/employee-storage";

export const AuthStorageService = {
  async login(credentials: LoginCredentials): Promise<boolean> {
    if (
      credentials.username === VALID_CREDENTIALS.USERNAME &&
      credentials.password === VALID_CREDENTIALS.PASSWORD
    ) {
      const session: AuthSession = {
        username: credentials.username,
        role: "admin",
        isAuthenticated: true,
        loginAt: new Date().toISOString(),
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(
          STORAGE_KEYS.AUTH_SESSION,
          JSON.stringify(session)
        );
      }
      return true;
    }

    const employees = await EmployeeStorageService.getAll();
    const user = employees.find(
      (emp) => emp.username === credentials.username && emp.password === credentials.password
    );

    if (user) {
      const session: AuthSession = {
        username: user.username,
        role: user.role,
        isAuthenticated: true,
        loginAt: new Date().toISOString(),
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(
          STORAGE_KEYS.AUTH_SESSION,
          JSON.stringify(session)
        );
      }
      return true;
    }
    return false;
  },

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    }
  },

  getSession(): AuthSession | null {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    if (!data) return null;
    try {
      return JSON.parse(data) as AuthSession;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    const session = this.getSession();
    return session?.isAuthenticated ?? false;
  },
};
