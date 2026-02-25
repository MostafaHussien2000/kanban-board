import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, getTasks, updateTask } from "../api/tasks-api";
import type { Task } from "../types/task";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  const createMutation = useMutation({
    mutationFn: (task: Omit<Task, "id">) => createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (task: Task) => updateTask(task.id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    ...tasksQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
