"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Employee } from "@/types";
import { EmployeeStorageService } from "@/services/employee-storage";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await EmployeeStorageService.getAll();
      setEmployees(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      fetchEmployees();
    });
    return () => {
      active = false;
    };
  }, [fetchEmployees]);

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return employees;
    const lowerQuery = searchQuery.toLowerCase();
    return employees.filter((emp) =>
      emp.name.toLowerCase().includes(lowerQuery)
    );
  }, [employees, searchQuery]);

  const deleteEmployee = useCallback(
    async (id: string) => {
      await EmployeeStorageService.delete(id);
      fetchEmployees();
    },
    [fetchEmployees]
  );

  const refresh = useCallback(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return {
    employees: filteredEmployees,
    allEmployees: employees,
    isLoading,
    searchQuery,
    setSearchQuery,
    deleteEmployee,
    refresh,
  };
}
