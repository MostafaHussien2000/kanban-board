import { PRIORITY_CONFIG } from "@/config/priorities.config";
import { STATUS_CONFIG } from "@/config/statuses.config";
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Please enter a task title."),
  description: z
    .string()
    .min(1, "Please provide some description for the task."),
  priority: z.enum(Object.keys(PRIORITY_CONFIG) as [string, ...string[]], {
    message: "You need to select a priority level.",
  }),
  status: z.enum(Object.keys(STATUS_CONFIG) as [string, ...string[]], {
    message: "You need to select a column.",
  }),
});

export type TaskSchema = z.infer<typeof taskSchema>;

export const newTaskDefaultValues: TaskSchema = {
  title: "",
  description: "",
  priority: "",
  status: "backlog",
};
