import { cn } from "@/lib/utils";
import TaskCard from "../task-card/task-card";

interface KanbanColumnProps {
  title: string;
  accent: string;
}

export default function KanbanColumn({ title, accent }: KanbanColumnProps) {
  return (
    <section className="flex flex-col gap-2 bg-muted rounded-2xl p-4 min-w-[350px]">
      <div className="flex items-center gap-3">
        {/* Colored Cirlce */}
        <div className={cn("w-3 aspect-square rounded-full", accent)}></div>
        <h2 className="text-md font-semibold text-muted-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground">3</span>
      </div>
      <div className="grid gap-2 mt-2">
        <TaskCard
          task={{
            id: "1",
            title: "Task 1",
            description: "Description 1",
            priority: "high",
            status: "backlog",
          }}
        />
        <TaskCard
          task={{
            id: "1",
            title: "Task 1",
            description: "Description 1",
            priority: "medium",
            status: "backlog",
          }}
        />
      </div>
    </section>
  );
}
