import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant: "default" | "warning" | "success" | "danger";
}

const variantStyles = {
  default: "from-slate-500/10 to-slate-600/5 text-slate-700",
  warning: "from-amber-500/10 to-amber-600/5 text-amber-700",
  success: "from-emerald-500/10 to-emerald-600/5 text-emerald-700",
  danger: "from-red-500/10 to-red-600/5 text-red-700",
};

const iconStyles = {
  default: "bg-slate-100 text-slate-600",
  warning: "bg-amber-100 text-amber-600",
  success: "bg-emerald-100 text-emerald-600",
  danger: "bg-red-100 text-red-600",
};

export function StatCard({ title, value, icon: Icon, variant }: StatCardProps) {
  return (
    <Card
      className={cn(
        "bg-gradient-to-br border transition-shadow hover:shadow-md",
        variantStyles[variant]
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("rounded-lg p-2", iconStyles[variant])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
