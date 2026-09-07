import { useEffect, useState } from "react";
import {
  CreateTaskPayload,
  Task,
  UpdateTaskPayload,
} from "../models/TaskModel";
import { taskService } from "../services/taskService";

export const useTaskViewModel = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Không thể kết nối Server");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (dto: CreateTaskPayload) => {
    try {
      const newTask = await taskService.create(dto);
      setTasks((prev) => [...prev, newTask]);
    } catch (err: any) {
      setError("Thêm thất bại");
    }
  };

  const updateTask = async (id: string, dto: UpdateTaskPayload) => {
    try {
      const updated = await taskService.update(id, dto);
      setTasks((prev) => prev.map((t) => (t.taskId === id ? updated : t)));
    } catch (err: any) {
      setError("Cập nhật thất bại");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.delete(id);
      setTasks((prev) => prev.filter((t) => t.taskId !== id));
    } catch (err: any) {
      setError("Xóa thất bại");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask };
};
