export enum TaskPriority {
  Low = 1,
  Medium = 2,
  High = 3,
}
export enum PersonalTaskStatus {
  Todo = 0,
  InProgress = 1,
  Completed = 2,
  Cancelled = 3,
}

export interface Task {
  taskId: string;
  taskName: string;
  taskDescription?: string;
  taskType: string;
  taskDueDate?: string;
  taskPriority: TaskPriority;
  status: PersonalTaskStatus;
  taskCategory?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  taskName: string;
  taskDescription?: string;
  taskType: string;
  taskDueDate?: string;
  taskPriority: TaskPriority;
  status: PersonalTaskStatus;
  taskCategory?: string;
}

export interface UpdateTaskPayload {
  taskDueDate?: string;
  taskPriority: TaskPriority;
  status: PersonalTaskStatus;
}
