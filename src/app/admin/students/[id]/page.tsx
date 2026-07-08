"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Student } from "@/types/student";
import { Exam } from "@/types/exam";

import { getStudentById } from "@/services/studentService";
import { getStudentExams } from "@/services/examService";

import StudentInfoCard from "@/components/students/profile/StudentInfoCard";
import StudentStatsCard from "@/components/students/profile/StudentStatsCard";
import StudentNetChart from "@/components/students/profile/StudentNetChart";
import StudentExamHistory from "@/components/students/profile/StudentExamHistory";

export default function StudentProfilePage() {
  const { id } = useParams<{ id: string }>();

  const [student, setStudent] =
    useState<Student | null>(null);

  const [exams, setExams] =
    useState<Exam[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!id) return;

    loadData(id);
  }, [id]);

  async function loadData(studentId: string) {
    try {
      const studentData =
        await getStudentById(studentId);

      setStudent(studentData);

      const examData =
        await getStudentExams(studentId);

      setExams(examData);
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

  const totalExam = exams.length;

  const averageNet =
    totalExam === 0
      ? 0
      : exams.reduce(
          (sum, exam) => sum + exam.totalNet,
          0
        ) / totalExam;

  const highestNet =
    totalExam === 0
      ? 0
      : Math.max(
          ...exams.map((exam) => exam.totalNet)
        );

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">
        {student.name}
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <StudentInfoCard
          phone={student.phone}
          school={student.school}
          className={student.className}
          parentName={student.parentName}
        />

        <StudentStatsCard
          totalExam={totalExam}
          averageNet={averageNet}
          highestNet={highestNet}
        />
      </div>

      <div className="mt-8">
        <StudentNetChart exams={exams} />
      </div>

      <div className="mt-8">
        <StudentExamHistory exams={exams} />
      </div>
    </>
  );
}