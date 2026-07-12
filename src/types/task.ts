export interface Task {
  id?: string;

  studentId: string;

  title: string;

  description: string;

  dueDate: string;

  completed: boolean;

  createdAt?: unknown;
}