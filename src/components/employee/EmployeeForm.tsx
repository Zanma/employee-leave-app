"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema, EmployeeFormData } from "@/validators";
import { DEPARTMENTS, POSITIONS } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmployeeFormProps {
  defaultValues?: EmployeeFormData;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  isEdit?: boolean;
}

export function EmployeeForm({
  defaultValues,
  onSubmit,
  isEdit = false,
}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema) as any,
    defaultValues: defaultValues ?? {
      name: "",
      department: "",
      position: "",
      username: "",
      password: "",
      role: "employee",
      leaveBalance: 12,
    },
  });

  const departmentValue = watch("department");
  const positionValue = watch("position");
  const roleValue = watch("role");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="e.g. John Doe"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select
          value={departmentValue}
          onValueChange={(val) =>
            setValue("department", val as string, { shouldValidate: true })
          }
        >
          <SelectTrigger id="department">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {DEPARTMENTS.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.department && (
          <p className="text-sm text-destructive">
            {errors.department.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="position">Position</Label>
        <Select
          value={positionValue}
          onValueChange={(val) =>
            setValue("position", val as string, { shouldValidate: true })
          }
        >
          <SelectTrigger id="position">
            <SelectValue placeholder="Select position" />
          </SelectTrigger>
          <SelectContent>
            {POSITIONS.map((pos) => (
              <SelectItem key={pos} value={pos}>
                {pos}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.position && (
          <p className="text-sm text-destructive">{errors.position.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="johndoe" {...register("username")} />
        {errors.username && (
          <p className="text-sm text-destructive">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="***" {...register("password")} />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select
          value={roleValue}
          onValueChange={(val) =>
            setValue("role", val as "admin" | "employee", { shouldValidate: true })
          }
        >
          <SelectTrigger id="role">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="employee">Employee</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-sm text-destructive">{errors.role.message}</p>
        )}
      </div>

      {roleValue === "employee" && (
        <div className="space-y-2">
          <Label htmlFor="leaveBalance">Leave Balance (Days)</Label>
          <Input
            id="leaveBalance"
            type="number"
            min="0"
            placeholder="e.g. 12"
            {...register("leaveBalance")}
          />
          {errors.leaveBalance && (
            <p className="text-sm text-destructive">{errors.leaveBalance.message}</p>
          )}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting
            ? isEdit
              ? "Saving..."
              : "Creating..."
            : isEdit
            ? "Save Changes"
            : "Create Employee"}
        </Button>
      </div>
    </form>
  );
}
