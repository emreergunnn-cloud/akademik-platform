"use client";

import { useEffect, useState } from "react";

import { Exam } from "@/types/exam";
import { getExams } from "@/services/examService";

export default function RecentExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExams();
  }, []);

  async function loadExams() {
    try {
      const data = await getExams();

      setExams(data.slice(0, 5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Son Denemeler
      </h2>

      {loading ? (
        <p className="text-slate-500">
          Yükleniyor...
        </p>
      ) : exams.length === 0 ? (
        <p className="text-slate-500">
          Henüz deneme bulunmuyor.
        </p>
      ) : (
        <div className="space-y-3">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-medium">
                  {exam.studentName}
                </p>

                <p className="text-sm text-slate-500">
                  {exam.examName}
                </p>
              </div>

              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                {exam.totalNet} Net
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}