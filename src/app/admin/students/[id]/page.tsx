"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Student } from "@/types/student";
import { getStudentById } from "@/services/studentService";

export default function StudentProfilePage() {
  const { id } = useParams<{ id: string }>();

  const [student, setStudent] =
    useState<Student | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!id) return;

    loadStudent(id);
  }, [id]);

  async function loadStudent(studentId: string) {
    try {
      const data = await getStudentById(studentId);

      setStudent(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        Yükleniyor...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        Öğrenci bulunamadı.
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">
        {student.name}
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Öğrenci Bilgileri
          </h2>

          <div className="space-y-3">
            <p>
              <strong>Telefon:</strong>{" "}
              {student.phone}
            </p>

            <p>
              <strong>Okul:</strong>{" "}
              {student.school}
            </p>

            <p>
              <strong>Sınıf:</strong>{" "}
              {student.className}
            </p>

            <p>
              <strong>Veli:</strong>{" "}
              {student.parentName}
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            İstatistikler
          </h2>

          <div className="space-y-3">
            <p>Toplam Deneme: 0</p>

            <p>Ortalama Net: 0</p>

            <p>En Yüksek Net: 0</p>
          </div>
        </div>
      </div>
    </>
  );
}