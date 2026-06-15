import { AuthSession, LoginCredentials } from "@/types";
import { STORAGE_KEYS } from "@/constants";

export const AuthStorageService = {
  async login(credentials: LoginCredentials): Promise<boolean> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      
      const session: AuthSession = {
        username: data.user.username,
        role: data.user.role,
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
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  },

  async logout(): Promise<void> {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    }
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout API failed", error);
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
