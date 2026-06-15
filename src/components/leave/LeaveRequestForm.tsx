"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leaveRequestSchema, LeaveRequestFormData } from "@/validators";
import { Employee } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { differenceInDays, parseISO } from "date-fns";
import { LeaveStorageService } from "@/services/leave-storage";
import { cn } from "@/lib/utils";

interface LeaveRequestFormProps {
  employees: Employee[];
  onSubmit: (data: LeaveRequestFormData) => Promise<void>;
}

export function LeaveRequestForm({ employees, onSubmit }: LeaveRequestFormProps) {
  const [usedLeave, setUsedLeave] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeaveRequestFormData>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      employeeId: "",
      startDate: "",
      endDate: "",
      reason: "",
    },
  });

  const employeeIdValue = watch("employeeId");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    let active = true;
    if (employeeIdValue) {
      LeaveStorageService.getByEmployeeId(employeeIdValue).then(requests => {
        if (!active) return;
        const used = requests
          .filter((r) => r.status === "APPROVED" || r.status === "PENDING")
          .reduce((total, r) => {
            const start = parseISO(r.startDate.toString());
            const end = parseISO(r.endDate.toString());
            const days = differenceInDays(end, start) + 1;
            return total + (days > 0 ? days : 0);
          }, 0);
        setUsedLeave(used);
      }).catch(console.error);
    } else {
      setUsedLeave(0);
    }
    return () => { active = false; };
  }, [employeeIdValue]);

  useEffect(() => {
    if (employees.length === 1 && !employeeIdValue) {
      setValue("employeeId", employees[0].id, { shouldValidate: true });
    }
  }, [employees, employeeIdValue, setValue]);

  const selectedEmployee = employees.find((e) => e.id === employeeIdValue);
  const TOTAL_LEAVE = selectedEmployee?.leaveBalance ?? 0;

  const remainingLeave = Math.max(0, TOTAL_LEAVE - usedLeave);

  let requestedDays = 0;
  if (startDate && endDate) {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const diff = differenceInDays(end, start) + 1;
    if (diff > 0) {
      requestedDays = diff;
    }
  }

  const isOverLimit = requestedDays > remainingLeave;

  const handleFinalSubmit = async (data: LeaveRequestFormData) => {
    const reqDays = differenceInDays(parseISO(data.endDate), parseISO(data.startDate)) + 1;
    if (reqDays > remainingLeave) {
      return; // prevent submit if somehow enabled
    }
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="employeeId">Employee</Label>
        {employees.length > 1 ? (
          <Select
            value={employeeIdValue}
            onValueChange={(val) =>
              setValue("employeeId", val as string, { shouldValidate: true })
            }
          >
            <SelectTrigger id="employeeId">
              <SelectValue placeholder="Select employee">
                {employeeIdValue
                  ? (() => {
                      const emp = employees.find((e) => e.id === employeeIdValue);
                      return emp ? `${emp.name} — ${emp.department}` : undefined;
                    })()
                  : undefined}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {employees.map((emp) => (
                <SelectItem key={emp.id} value={emp.id}>
                  {emp.name} — {emp.department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="flex items-center p-3 border rounded-md bg-muted/30">
            <div className="flex flex-col">
              <span className="font-medium text-foreground">{employees[0]?.name}</span>
              <span className="text-xs text-muted-foreground">{employees[0]?.department}</span>
            </div>
          </div>
        )}
        {errors.employeeId && (
          <p className="text-sm text-destructive">{errors.employeeId.message}</p>
        )}
        
        {employeeIdValue && (
          <div className="text-sm p-3 bg-muted/50 rounded-md border border-border mt-3">
            <div className="flex justify-between font-medium">
              <span>Total Leave Allowance:</span>
              <span>{TOTAL_LEAVE} days</span>
            </div>
            <div className="flex justify-between text-muted-foreground mt-1">
              <span>Used / Pending:</span>
              <span>{usedLeave} days</span>
            </div>
            <div className="flex justify-between font-semibold text-primary mt-1 border-t pt-1 border-border">
              <span>Remaining Leave:</span>
              <span>{remainingLeave} days</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              {...register("startDate")}
            />
            {errors.startDate && (
              <p className="text-sm text-destructive">{errors.startDate.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              min={startDate || undefined}
              {...register("endDate")}
            />
            {errors.endDate && (
              <p className="text-sm text-destructive">{errors.endDate.message}</p>
            )}
          </div>
        </div>
        
        {requestedDays > 0 && (
          <div className="text-sm p-3 bg-card border rounded-md">
            Requested: <span className={cn("font-semibold", isOverLimit ? "text-destructive" : "text-primary")}>{requestedDays} days</span>
            {isOverLimit && <span className="text-destructive ml-2 font-medium">({requestedDays - remainingLeave} days over remaining balance)</span>}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason</Label>
        <Textarea
          id="reason"
          placeholder="Describe the reason for the leave request..."
          rows={4}
          {...register("reason")}
        />
        {errors.reason && (
          <p className="text-sm text-destructive">{errors.reason.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting || isOverLimit || (requestedDays > 0 && isOverLimit)} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Leave Request"}
      </Button>
    </form>
  );
}
