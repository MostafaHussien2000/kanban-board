import { cn } from "@/lib/utils";
import type { Task, TaskPriority } from "@/types/task";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <h5 className="text-sm font-medium text-primary">{task.title}</h5>
      <p className="text-xs text-muted-foreground">{task.description}</p>
      <TaskPriorety priorety={task.priority} />
    </div>
  );
}

function TaskPriorety({ priorety }: { priorety: TaskPriority }) {
  const prioretyColors: {
    [key in TaskPriority]: {
      text: string;
      bg: string;
    };
  } = {
    low: {
      text: "text-gray-700",
      bg: "bg-green-200",
    },
    medium: {
      text: "text-orange-700",
      bg: "bg-orange-200",
    },
    high: {
      text: "text-red-700",
      bg: "bg-red-200",
    },
  };
  return (
    <span
      className={cn(
        "text-xs px-2 py-1 rounded-sm",
        prioretyColors[priorety].text,
        prioretyColors[priorety].bg,
      )}
    >
      {priorety.charAt(0).toUpperCase() + priorety.slice(1)}
    </span>
  );
}
