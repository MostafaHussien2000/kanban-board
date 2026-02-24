import { cn } from "@/lib/utils";
import { STATUS_CONFIG } from "@/config/statuses.config";
import type { TaskStatus } from "@/types/task";
import TaskCard from "../task-card/task-card";

interface KanbanColumnProps {
  statusKey: TaskStatus;
}

export default function KanbanColumn({ statusKey }: KanbanColumnProps) {
  const { label, accent } = STATUS_CONFIG[statusKey];

  return (
    <section className="flex flex-col gap-2 bg-muted rounded-2xl p-4 min-w-[350px]">
      <div className="flex items-center gap-3">
        {/* Colored accent dot */}
        <div className={cn("w-3 aspect-square rounded-full", accent)} />
        <h2 className="text-md font-semibold text-muted-foreground font-mono">
          {label}
        </h2>
        <span className="text-sm text-muted-foreground">3</span>
      </div>
      <div className="grid gap-2 mt-2">
        <TaskCard
          task={{
            id: "1",
            title: "Task 1",
            description: "Description 1",
            priority: "high",
            status: statusKey,
          }}
        />
        <TaskCard
          task={{
            id: "2",
            title: "Task 2",
            description: "Description 2",
            priority: "medium",
            status: statusKey,
          }}
        />
        <TaskCard
          task={{
            id: "2",
            title: "Task 2",
            description: "Description 2",
            priority: "low",
            status: statusKey,
          }}
        />
      </div>
    </section>
  );
}
