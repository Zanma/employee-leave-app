type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  error?: unknown;
  timestamp: string;
}

function formatEntry(entry: LogEntry): string {
  return `[${entry.timestamp}] [${entry.level.toUpperCase()}]${entry.context ? ` [${entry.context}]` : ""} ${entry.message}`;
}

export const logger = {
  info(message: string, context?: string): void {
    const entry: LogEntry = { level: "info", message, context, timestamp: new Date().toISOString() };
    console.info(formatEntry(entry));
  },

  warn(message: string, context?: string): void {
    const entry: LogEntry = { level: "warn", message, context, timestamp: new Date().toISOString() };
    console.warn(formatEntry(entry));
  },

  error(message: string, error?: unknown, context?: string): void {
    const entry: LogEntry = { level: "error", message, error, context, timestamp: new Date().toISOString() };
    console.error(formatEntry(entry), error ?? "");
    // In production, forward to an error monitoring service (e.g. Sentry):
    // Sentry.captureException(error, { extra: { message, context } });
  },
};
