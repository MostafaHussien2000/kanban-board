import { cn } from "@/lib/utils";
import { STATUS_CONFIG } from "@/config/statuses.config";
import type { Task, TaskStatus } from "@/types/task";
import TaskCard from "../task-card/task-card";
import { Icons } from "@/components/ui/icon";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

interface KanbanColumnProps {
  statusKey: TaskStatus;
  tasks: Task[];
  isLoading?: boolean;
  showForm: (status: TaskStatus) => void;
  onSelect?: (task: Task) => void;
}

export default function KanbanColumn({
  statusKey,
  tasks,
  isLoading,
  showForm,
  onSelect,
}: KanbanColumnProps) {
  const { label, accent } = STATUS_CONFIG[statusKey];
  const { setNodeRef } = useDroppable({
    id: statusKey,
  });

  return (
    <section
      ref={setNodeRef}
      className="flex flex-col gap-2 bg-muted rounded-2xl p-4 w-[350px] min-h-[500px]"
    >
      <div className="flex items-center gap-3">
        {/* Colored accent dot */}
        <div className={cn("w-3 aspect-square rounded-full", accent)} />
        <h2 className="text-md font-semibold text-muted-foreground font-mono">
          {label}
        </h2>
        <span className="text-sm text-muted-foreground">
          {isLoading ? "—" : tasks.length}
        </span>
      </div>
      <div className="flex-1 flex flex-col gap-2 mt-2">
        {isLoading ? (
          // Skeleton placeholders while fetching
          Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg p-3 animate-pulse"
            >
              <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted-foreground/10 rounded w-full mb-1" />
              <div className="h-3 bg-muted-foreground/10 rounded w-2/3" />
            </div>
          ))
        ) : tasks.length === 0 ? (
          <p className="text-xs text-muted-foreground font-mono text-center py-4">
            No tasks
          </p>
        ) : (
          <SortableContext
            items={tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onSelect={onSelect} />
            ))}
          </SortableContext>
        )}
        <div className="mt-auto">
          <button
            className="w-full border-2 border-dotted p-3 hover:bg-gray-200 rounded-lg cursor-pointer font-mono text-sm flex items-center justify-center gap-3"
            onClick={() => showForm(statusKey)}
          >
            <Icons.Plus /> Add task
          </button>
        </div>
      </div>
    </section>
  );
}
