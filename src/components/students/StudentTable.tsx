"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Student } from "@/types/student";

interface StudentTableProps {
  students: Student[];
  onDelete: (student: Student) => void;
  onEdit: (student: Student) => void;
}

export default function StudentTable({
  students,
  onDelete,
  onEdit,
}: StudentTableProps) {
  if (students.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <p className="text-slate-600">
          Henüz kayıtlı öğrenci bulunmuyor.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Ad Soyad</th>
            <th className="p-4 text-left">Okul</th>
            <th className="p-4 text-left">Sınıf</th>
            <th className="p-4 text-left">Telefon</th>
            <th className="p-4 text-left">Veli</th>
            <th className="p-4 text-center">İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="p-4 font-medium">
                {student.name}
              </td>

              <td className="p-4">
                {student.school}
              </td>

              <td className="p-4">
                {student.className}
              </td>

              <td className="p-4">
                {student.phone}
              </td>

              <td className="p-4">
                {student.parentName}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(student)}
                    className="rounded-lg bg-amber-500 p-2 text-white hover:bg-amber-600"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(student)}
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