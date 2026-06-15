"use client";

import { useState, useEffect, useCallback } from "react";
import { logger } from "@/lib/logger";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let active = true;
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item) as T;
        Promise.resolve().then(() => {
          if (active) {
            setStoredValue(parsed);
          }
        });
      }
    } catch (error) {
      logger.error(`Error reading localStorage key "${key}"`, error, "useLocalStorage");
    }
    return () => {
      active = false;
    };
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        logger.error(`Error setting localStorage key "${key}"`, error, "useLocalStorage");
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
