import { cn } from "@/lib/utils";
import { PRIORITY_CONFIG } from "@/config/priorities.config";
import type { Task, TaskPriority } from "@/types/task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: Task;
  onSelect?: (task: Task) => void;
}

export default function TaskCard({ task, onSelect }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-card/50 border border-border rounded-lg p-3 opacity-0"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-card border border-border rounded-lg p-3 cursor-pointer active:cursor-grabbing hover:border-primary/50 transition-colors"
      onClick={() => onSelect?.(task)}
    >
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
