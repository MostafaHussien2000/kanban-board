import { STATUS_CONFIG } from "@/config/statuses.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TaskStatus } from "@/types/task";
import KanbanColumn from "../kanban-column/kanban-column";
import { useTasks } from "@/hooks/useTasks";
import AddTaskForm from "../add-task-form/add-task-form";
import { useState } from "react";

export default function KanbanBoard() {
  const { data, isLoading, isError } = useTasks();

  const [addNewTaskFormTogge, setAddNewTaskFormToggle] =
    useState<boolean>(false);

  const tasks = data?.data ?? [];

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center text-destructive font-mono text-sm">
        Failed to load tasks. Make sure the JSON server is running on port 3000.
      </div>
    );
  }

  return (
    <>
      <ScrollArea type="scroll" className="flex-1 h-0 w-full p-10">
        <div className="flex gap-4">
          {(Object.keys(STATUS_CONFIG) as TaskStatus[]).map((statusKey) => (
            <KanbanColumn
              key={statusKey}
              statusKey={statusKey}
              tasks={tasks.filter((task) => task.status === statusKey)}
              isLoading={isLoading}
              showForm={() => setAddNewTaskFormToggle(true)}
            />
          ))}
        </div>
      </ScrollArea>
      {addNewTaskFormTogge ? (
        <AddTaskForm
          visible={addNewTaskFormTogge}
          close={() => setAddNewTaskFormToggle(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
}
