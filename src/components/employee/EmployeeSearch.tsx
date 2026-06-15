"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface EmployeeSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function EmployeeSearch({ value, onChange }: EmployeeSearchProps) {
  const [localValue, setLocalValue] = useState(value);

  // Debounce: update parent after 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        id="employee-search"
        placeholder="Search by name..."
        className="pl-9 pr-9"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
      {localValue && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          onClick={() => {
            setLocalValue("");
            onChange("");
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
