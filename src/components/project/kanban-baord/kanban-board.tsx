import { STATUS_CONFIG } from "@/config/statuses.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TaskStatus } from "@/types/task";
import KanbanColumn from "../kanban-column/kanban-column";
import { useTasks } from "@/hooks/useTasks";
import AddTaskForm from "../add-task-form/add-task-form";
import { arrayMove } from "@dnd-kit/sortable";
import { useState, useMemo } from "react";
import TaskDetailsModal from "../task-details-modal/task-details-modal";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
  closestCorners,
  defaultDropAnimationSideEffects,
  type DragStartEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import TaskCard from "../task-card/task-card";
import type { Task } from "@/types/task";

export default function KanbanBoard() {
  const { data, isLoading, isError, updateMutation } = useTasks();

  const [addNewTaskFormStatus, setAddNewTaskFormStatus] =
    useState<TaskStatus | null>(null);
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const tasks = useMemo(() => {
    if (activeId) return localTasks;
    return (data?.data ?? []).sort((a, b) => a.order - b.order);
  }, [data?.data, activeId, localTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const currentTasks = (data?.data ?? []).sort((a, b) => a.order - b.order);
    setLocalTasks(currentTasks);
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = localTasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const overTask = localTasks.find((t) => t.id === overId);
    const isOverAColumn = (Object.keys(STATUS_CONFIG) as string[]).includes(
      overId as string,
    );

    const newStatus = overTask
      ? overTask.status
      : isOverAColumn
        ? (overId as TaskStatus)
        : null;

    if (!newStatus) return;

    if (activeTask.status !== newStatus) {
      setLocalTasks((prev) => {
        const activeIndex = prev.findIndex((t) => t.id === activeId);
        const overIndex = overTask
          ? prev.findIndex((t) => t.id === overId)
          : prev.length;

        const updatedTasks = [...prev];
        updatedTasks[activeIndex] = { ...activeTask, status: newStatus };

        return arrayMove(updatedTasks, activeIndex, overIndex);
      });
    } else if (overTask) {
      setLocalTasks((prev) => {
        const activeIndex = prev.findIndex((t) => t.id === activeId);
        const overIndex = prev.findIndex((t) => t.id === overId);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    const currentActiveId = activeId;
    setActiveId(null);
    setLocalTasks([]);

    if (!over || !currentActiveId) return;

    const finalActiveTask = localTasks.find((t) => t.id === currentActiveId);
    if (!finalActiveTask) return;

    // Calculate the final order based on new neighbors in localTasks
    const columnTasks = localTasks.filter(
      (t) => t.status === finalActiveTask.status,
    );
    const finalIndex = columnTasks.findIndex((t) => t.id === currentActiveId);

    const prevTask = columnTasks[finalIndex - 1];
    const nextTask = columnTasks[finalIndex + 1];

    let finalOrder = finalActiveTask.order;

    if (!prevTask && !nextTask) {
      finalOrder = 1000;
    } else if (!prevTask) {
      finalOrder = nextTask.order / 2;
    } else if (!nextTask) {
      finalOrder = prevTask.order + 1000;
    } else {
      finalOrder = (prevTask.order + nextTask.order) / 2;
    }

    // Always update if it was a cross-column move or order changed
    const originalTask = data?.data.find((t) => t.id === currentActiveId);

    if (
      originalTask &&
      (originalTask.status !== finalActiveTask.status ||
        Math.abs(originalTask.order - finalOrder) > 0.01)
    ) {
      updateMutation.mutate({
        ...finalActiveTask,
        order: finalOrder,
      });
    }
  };

  const handleCloseForm = () => {
    setAddNewTaskFormStatus(null);
    setTaskToEdit(null);
  };

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 items-start">
            {(Object.keys(STATUS_CONFIG) as TaskStatus[]).map((statusKey) => (
              <KanbanColumn
                key={statusKey}
                statusKey={statusKey}
                tasks={tasks.filter((task: Task) => task.status === statusKey)}
                isLoading={isLoading}
                showForm={(status) => setAddNewTaskFormStatus(status)}
                onSelect={(task) => setSelectedTask(task)}
              />
            ))}
          </div>
          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: {
                  active: {
                    opacity: "0.5",
                  },
                },
              }),
            }}
          >
            {activeId ? (
              <TaskCard task={tasks.find((task) => task.id === activeId)!} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </ScrollArea>
      {addNewTaskFormStatus || taskToEdit ? (
        <AddTaskForm
          taskToEdit={taskToEdit || undefined}
          defaultStatus={addNewTaskFormStatus || undefined}
          visible={!!(addNewTaskFormStatus || taskToEdit)}
          close={handleCloseForm}
        />
      ) : null}

      {selectedTask ? (
        <TaskDetailsModal
          task={selectedTask}
          close={() => setSelectedTask(null)}
          onEdit={() => {
            setTaskToEdit(selectedTask);
            setSelectedTask(null);
          }}
        />
      ) : null}
    </>
  );
}
