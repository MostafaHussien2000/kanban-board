import axios from "axios";
import type { Task } from "../types/task";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

/**
 * Get all tasks
 * @returns Promise<Task[]>
 * @example
 * ```typescript
 * const tasks = await getTasks();
 * ```
 */
export const getTasks = () => API.get<Task[]>("/tasks");

/**
 * Get task by id
 * @param id Task id
 * @returns Promise<Task>
 * @example
 * ```typescript
 * const task = await getTaskById(1);
 * ```
 */
export const getTaskById = (id: number) => API.get<Task>(`/tasks/${id}`);

/**
 * Create task
 * @param task Task without id
 * @returns Promise<Task>
 * @example
 * ```typescript
 * const task = await createTask({
 *   title: "Task 1",
 *   description: "Description 1",
 *   status: "backlog",
 *   priority: "low",
 * });
 * ```
 */
export const createTask = (task: Omit<Task, "id">) =>
  API.post<Task>("/tasks", task);

/**
 * Update task
 * @param id Task id
 * @param task Task without id
 * @returns Promise<Task>
 * @example
 * ```typescript
 * const task = await updateTask(1, {
 *   title: "Task 1",
 *   description: "Description 1",
 *   status: "backlog",
 *   priority: "low",
 * });
 * ```
 */
export const updateTask = (id: number, task: Omit<Task, "id">) =>
  API.put<Task>(`/tasks/${id}`, task);

/**
 * Delete task
 * @param id Task id
 * @returns Promise<void>
 * @example
 * ```typescript
 * await deleteTask(1);
 * ```
 */
export const deleteTask = (id: number) => API.delete<void>(`/tasks/${id}`);
