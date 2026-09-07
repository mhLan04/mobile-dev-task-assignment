import {
  CreateTaskPayload,
  Task,
  UpdateTaskPayload,
} from "../models/TaskModel";
import api from "./api";

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const res = await api.get<Task[]>("/tasks");
    return res.data;
  },
  create: async (dto: CreateTaskPayload): Promise<Task> => {
    const res = await api.post<Task>("/tasks", dto);
    return res.data;
  },
  update: async (id: string, dto: UpdateTaskPayload): Promise<Task> => {
    const res = await api.put<Task>(`/tasks/${id}`, dto);
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
