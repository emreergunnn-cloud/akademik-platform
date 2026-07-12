"use client";

import { useEffect, useState } from "react";

import { Task } from "@/types/task";

import {
  addTask,
  completeTask,
  deleteTask,
  getStudentTasks,
} from "@/services/taskService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StudentTaskCardProps {
  studentId: string;
}

export default function StudentTaskCard({
  studentId,
}: StudentTaskCardProps) {
  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [title, setTitle] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data =
      await getStudentTasks(studentId);

    setTasks(data);
  }

  async function handleAdd() {
    if (!title.trim()) return;

    setLoading(true);

    await addTask({
      studentId,
      title,
      description: "",
      dueDate: "",
      completed: false,
    });

    setTitle("");

    await loadTasks();

    setLoading(false);
  }

  async function handleToggle(task: Task) {
    await completeTask(
      task.id!,
      !task.completed
    );

    loadTasks();
  }

  async function handleDelete(id: string) {
    await deleteTask(id);

    loadTasks();
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        📅 Haftalık Görevler
      </h2>

      <div className="mb-6 flex gap-2">

        <Input
          placeholder="Yeni görev..."
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <Button
          onClick={handleAdd}
          disabled={loading}
        >
          Ekle
        </Button>

      </div>

      <div className="space-y-3">

        {tasks.length === 0 && (
          <p>
            Henüz görev bulunmuyor.
          </p>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  handleToggle(task)
                }
              />

              <span
                className={
                  task.completed
                    ? "line-through text-slate-400"
                    : ""
                }
              >
                {task.title}
              </span>

            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                handleDelete(task.id!)
              }
            >
              Sil
            </Button>

          </div>
        ))}

      </div>

    </div>
  );
}