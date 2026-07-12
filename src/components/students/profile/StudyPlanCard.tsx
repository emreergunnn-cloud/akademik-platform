"use client";

import { useEffect, useState } from "react";

import { StudyPlan } from "@/types/studyPlan";

import {
  addStudyPlan,
  deleteStudyPlan,
  getStudentStudyPlans,
  updateStudyPlan,
} from "@/services/studyPlanService";

interface StudyPlanCardProps {
  studentId: string;
}

const days = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
] as const;

export default function StudyPlanCard({
  studentId,
}: StudyPlanCardProps) {
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [title, setTitle] = useState("");
  const [day, setDay] =
    useState<(typeof days)[number]>("Pazartesi");

  useEffect(() => {
    loadPlans();
  }, []);

  async function loadPlans() {
    const data =
      await getStudentStudyPlans(studentId);

    setPlans(data);
  }

  async function handleAdd() {
    if (!title.trim()) return;

    await addStudyPlan({
      studentId,
      day,
      title,
      completed: false,
    });

    setTitle("");

    loadPlans();
  }

  async function handleToggle(plan: StudyPlan) {
    await updateStudyPlan(
      plan.id!,
      !plan.completed
    );

    loadPlans();
  }

  async function handleDelete(id: string) {
    await deleteStudyPlan(id);

    loadPlans();
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        📅 Haftalık Çalışma Planı
      </h2>

      <div className="mb-6 flex flex-wrap gap-3">

        <select
          value={day}
          onChange={(e) =>
            setDay(
              e.target.value as (typeof days)[number]
            )
          }
          className="rounded-lg border p-2"
        >
          {days.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Görev..."
          className="flex-1 rounded-lg border p-2"
        />

        <button
          onClick={handleAdd}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Ekle
        </button>

      </div>

      <div className="space-y-6">

        {days.map((currentDay) => {

          const dayPlans =
            plans.filter(
              (plan) =>
                plan.day === currentDay
            );

          return (
            <div key={currentDay}>

              <h3 className="mb-2 font-semibold">
                {currentDay}
              </h3>

              {dayPlans.length === 0 && (
                <p className="text-sm text-slate-500">
                  Görev yok.
                </p>
              )}

              <div className="space-y-2">

                {dayPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >

                    <div className="flex items-center gap-3">

                      <input
                        type="checkbox"
                        checked={plan.completed}
                        onChange={() =>
                          handleToggle(plan)
                        }
                      />

                      <span
                        className={
                          plan.completed
                            ? "line-through text-slate-400"
                            : ""
                        }
                      >
                        {plan.title}
                      </span>

                    </div>

                    <button
                      onClick={() =>
                        handleDelete(plan.id!)
                      }
                      className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                    >
                      Sil
                    </button>

                  </div>
                ))}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}