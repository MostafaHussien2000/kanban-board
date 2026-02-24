import { cn } from "@/lib/utils";
import { PRIORITY_CONFIG } from "@/config/priorities.config";
import type { Task, TaskPriority } from "@/types/task";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <h5 className="text-md font-medium text-primary font-mono">
        {task.title}
      </h5>
      <p className="text-sm text-muted-foreground">{task.description}</p>
      <TaskPriorityBadge priority={task.priority} />
    </div>
  );
}

function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  const { label, textColor, bgColor } = PRIORITY_CONFIG[priority];

  return (
    <span
      className={cn(
        "text-xs px-2 py-1 rounded-sm mt-2 inline-block font-medium font-mono",
        textColor,
        bgColor,
      )}
    >
      {label.toUpperCase()}
    </span>
  );
}
