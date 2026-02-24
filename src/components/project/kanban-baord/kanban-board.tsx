import { STATUS_CONFIG } from "@/config/statuses.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TaskStatus } from "@/types/task";
import KanbanColumn from "../kanban-column/kanban-column";

export default function KanbanBoard() {
  return (
    <>
      <ScrollArea type="scroll" className="flex-1 h-0 w-full p-10">
        <div className="flex gap-4">
          {(Object.keys(STATUS_CONFIG) as TaskStatus[]).map((statusKey) => (
            <KanbanColumn key={statusKey} statusKey={statusKey} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
