"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { LeaveRequest, LeaveRequestStatus } from "@/types";
import { LeaveStorageService } from "@/services/leave-storage";
import { logger } from "@/lib/logger";

export type StatusFilter = LeaveRequestStatus | "ALL";

export function useLeaveRequests() {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await LeaveStorageService.getAll();
      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      fetchRequests();
    });
    return () => {
      active = false;
    };
  }, [fetchRequests]);

  const filteredRequests = useMemo(() => {
    if (statusFilter === "ALL") return requests;
    return requests.filter((req) => req.status === statusFilter);
  }, [requests, statusFilter]);

  const approve = useCallback(
    async (id: string) => {
      try {
        await LeaveStorageService.updateStatus(id, "APPROVED");
        fetchRequests();
      } catch (error) {
        logger.error("Failed to approve leave request", error, "useLeaveRequests");
      }
    },
    [fetchRequests]
  );

  const reject = useCallback(
    async (id: string) => {
      try {
        await LeaveStorageService.updateStatus(id, "REJECTED");
        fetchRequests();
      } catch (error) {
        logger.error("Failed to reject leave request", error, "useLeaveRequests");
      }
    },
    [fetchRequests]
  );

  const refresh = useCallback(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests: filteredRequests,
    allRequests: requests,
    isLoading,
    statusFilter,
    setStatusFilter,
    approve,
    reject,
    refresh,
  };
}
