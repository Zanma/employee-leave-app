"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthStorageService } from "@/services/auth-storage";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (AuthStorageService.isAuthenticated()) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}
