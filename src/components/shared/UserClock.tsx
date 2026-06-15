"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { EmployeeStorageService } from "@/services/employee-storage";
import { Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function UserClock() {
  const { session } = useAuth();
  const [time, setTime] = useState<Date | null>(null);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setTime(new Date());
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let active = true;
    if (session?.username) {
      if (session.username === "admin") {
        setFullName("Super Administrator");
      } else {
        EmployeeStorageService.getAll().then((all) => {
          if (!active) return;
          const user = all.find((e) => e.username === session.username);
          setFullName(user ? user.name : session.username);
        });
      }
    }
    return () => {
      active = false;
    };
  }, [session]);

  if (!time || !session) return null;

  return (
    <div className="flex flex-col items-end justify-center text-xs text-muted-foreground gap-1">
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-foreground capitalize truncate max-w-[120px] sm:max-w-[200px]">
          {fullName}
        </span>
        <Badge variant="outline" className="text-[9px] sm:text-[10px] uppercase py-0 px-1.5 h-4">
          {session.role}
        </Badge>
        <User className="h-3.5 w-3.5 ml-0.5" />
      </div>
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <span>
          {time.toLocaleDateString("id-ID", { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          })}
        </span>
        <span>•</span>
        <span className="font-mono">
          {time.toLocaleTimeString("id-ID", {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </span>
        <Clock className="h-3 w-3 ml-0.5" />
      </div>
    </div>
  );
}
