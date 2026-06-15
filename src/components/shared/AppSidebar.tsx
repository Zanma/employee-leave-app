"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  LogOut,
  Menu,
  X,
  FileCheck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/leave", label: "Leave Requests", icon: CalendarDays },
  { href: "/code-review", label: "Code Review", icon: FileCheck },
];

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Separator />
      <div className="px-3 py-4">
        <button
          onClick={() => {
            logout();
            onNavigate?.();
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

import { UserClock } from "@/components/shared/UserClock";

export function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Universal Topbar (Mobile & Desktop) */}
      <div className="sticky top-0 z-40 flex h-[69px] items-center justify-between gap-4 border-b bg-background/95 backdrop-blur px-4 lg:px-8 w-full">
        <div className="flex items-center gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "lg:hidden -ml-2" })}>
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle navigation</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <NavContent onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-bold tracking-tight">
            <span className="text-primary">ELS</span>{" "}
            <span className="text-muted-foreground font-normal hidden sm:inline">
              Leave Manager
            </span>
          </h1>
        </div>
        
        <UserClock />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:top-[69px] lg:bottom-0 lg:left-0 lg:flex lg:w-64 lg:flex-col border-r bg-card z-30">
        <NavContent />
      </aside>
    </>
  );
}
