import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icon";
import { STATUS_CONFIG } from "@/config/statuses.config";
import { PRIORITY_CONFIG } from "@/config/priorities.config";
import type { Task } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import { useEffect } from "react";

interface TaskDetailsModalProps {
  task: Task;
  close: () => void;
  onEdit: () => void;
}

export default function TaskDetailsModal({
  task,
  close,
  onEdit,
}: TaskDetailsModalProps) {
  const { deleteMutation } = useTasks();

  const status = STATUS_CONFIG[task.status];
  const priority = PRIORITY_CONFIG[task.priority];

  const handleDelete = () => {
    deleteMutation.mutate(task.id, {
      onSuccess: () => {
        close();
      },
    });
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div
      className="w-full h-full fixed bg-black/10 backdrop-blur-sm z-10 p-5 flex items-start justify-center"
      onClick={close}
    >
      <Card
        className="w-full max-w-[500px] shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="font-mono text-lg font-bold">
              TASK DETAILS
            </CardTitle>
            <button type="button" className="cursor-pointer" onClick={close}>
              <Icons.Close size={26} />
            </button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold font-mono text-primary uppercase">
              {task.title}
            </h2>
            <div className="flex gap-2">
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded-sm font-medium font-mono",
                  priority.textColor,
                  priority.bgColor,
                )}
              >
                {priority.label.toUpperCase()}
              </span>
              <span className="text-xs px-2 py-1 bg-muted rounded-sm font-medium font-mono text-muted-foreground uppercase flex items-center gap-1.5">
                <div
                  className={cn(
                    "w-2 aspect-square rounded-full",
                    status.accent,
                  )}
                />
                {status.label}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
              Description
            </span>
            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {task.description}
            </p>
          </div>

          <div className="pt-4 border-t border-border mt-2 grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              className="font-mono gap-2 shadow-none"
              onClick={onEdit}
            >
              <Icons.Edit size={18} />
              EDIT TASK
            </Button>
            <Button
              variant="destructive"
              className="font-mono gap-2 text-white shadow-none"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              <Icons.Trash size={18} />
              DELETE TASK
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
