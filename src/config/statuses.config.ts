export interface StatusConfig {
  label: string;
  /** Tailwind background class for the column accent dot (e.g. "bg-orange-500") */
  accent: string;
}

/**
 * Global configuration for all kanban columns / task statuses.
 * Add, remove, or reorder entries here to change the board layout application-wide.
 */
export const STATUS_CONFIG = {
  backlog: {
    label: "Todo",
    accent: "bg-blue-500",
  },
  "in-progress": {
    label: "In Progress",
    accent: "bg-orange-500",
  },
  review: {
    label: "In Review",
    accent: "bg-purple-500",
  },
  done: {
    label: "Done",
    accent: "bg-green-500",
  },
} satisfies Record<string, StatusConfig>;

/** Union of all valid task status keys — derived from the config, always in sync. */
export type TaskStatus = keyof typeof STATUS_CONFIG;
