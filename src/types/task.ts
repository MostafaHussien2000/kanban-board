// Types are derived from the config so they always stay in sync.
export type { TaskStatus } from "@/config/statuses.config";
export type { TaskPriority } from "@/config/priorities.config";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: import("@/config/statuses.config").TaskStatus;
  priority: import("@/config/priorities.config").TaskPriority;
}
