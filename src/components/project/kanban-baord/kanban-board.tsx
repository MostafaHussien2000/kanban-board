import { ScrollArea } from "@/components/ui/scroll-area";
import KanbanColumn from "../kanban-column/kanban-column";

export default function KanbanBoard() {
  return (
    <>
      <ScrollArea type="scroll" className="flex-1 h-0 w-full p-10">
        <div className="flex gap-4">
          <KanbanColumn title="Backlog" accent="bg-gray-500" />
          <KanbanColumn title="To Do" accent="bg-blue-500" />
          <KanbanColumn title="In Progress" accent="bg-orange-500" />
          <KanbanColumn title="Done" accent="bg-green-500" />
          <KanbanColumn title="Done" accent="bg-green-500" />
          <KanbanColumn title="Done" accent="bg-green-500" />
          <KanbanColumn title="Done" accent="bg-green-500" />
          <KanbanColumn title="Done" accent="bg-green-500" />
          <KanbanColumn title="Done" accent="bg-green-500" />
          <KanbanColumn title="Done" accent="bg-green-500" />
        </div>
      </ScrollArea>
    </>
  );
}
