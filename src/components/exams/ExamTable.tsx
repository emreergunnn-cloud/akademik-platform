"use client";

import { Pencil, Trash2 } from "lucide-react";

import { Exam } from "@/types/exam";

interface ExamTableProps {
  exams: Exam[];
  onEdit: (exam: Exam) => void;
  onDelete: (exam: Exam) => void;
}

export default function ExamTable({
  exams,
  onEdit,
  onDelete,
}: ExamTableProps) {
  if (exams.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        Henüz kayıtlı deneme bulunmuyor.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">
              Öğrenci
            </th>

            <th className="p-4 text-left">
              Deneme
            </th>

            <th className="p-4 text-left">
              Tür
            </th>

            <th className="p-4 text-left">
              Tarih
            </th>

            <th className="p-4 text-center">
              Toplam Net
            </th>

            <th className="p-4 text-center">
              İşlemler
            </th>
          </tr>
        </thead>

        <tbody>
          {exams.map((exam) => (
            <tr
              key={exam.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="p-4 font-medium">
                {exam.studentName}
              </td>

              <td className="p-4">
                {exam.examName}
              </td>

              <td className="p-4">
                {exam.examType}
              </td>

              <td className="p-4">
                {exam.examDate}
              </td>

              <td className="p-4 text-center font-bold">
                {exam.totalNet}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(exam)}
                    className="rounded-lg bg-amber-500 p-2 text-white hover:bg-amber-600"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(exam)}
                    className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}