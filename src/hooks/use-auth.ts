"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AuthStorageService } from "@/services/auth-storage";
import { AuthSession, LoginCredentials } from "@/types";

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    
    // Check if middleware redirected us because of missing/invalid token
    if (typeof window !== "undefined" && window.location.search.includes("expired=1")) {
      AuthStorageService.logout(); // Clear local storage
    }

    const currentSession = AuthStorageService.getSession();
    Promise.resolve().then(() => {
      if (!active) return;
      setSession(currentSession);
      setIsLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      const success = await AuthStorageService.login(credentials);
      if (success) {
        const newSession = AuthStorageService.getSession();
        setSession(newSession);
        router.push("/dashboard");
      }
      return success;
    },
    [router]
  );

  const logout = useCallback(async () => {
    await AuthStorageService.logout();
    setSession(null);
    router.push("/login");
  }, [router]);

  const isAuthenticated = session?.isAuthenticated ?? false;

  return {
    session,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
