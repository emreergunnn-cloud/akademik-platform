"use client";

import { useEffect, useState } from "react";

import {
  Users,
  ClipboardList,
  UserRound,
  FileText,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import RecentStudents from "@/components/dashboard/RecentStudents";
import RecentExams from "@/components/dashboard/RecentExams";

import { getStudents } from "@/services/studentService";
import { getExams } from "@/services/examService";

export default function AdminPage() {
  const [studentCount, setStudentCount] =
    useState(0);

  const [examCount, setExamCount] =
    useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const students = await getStudents();
      const exams = await getExams();

      setStudentCount(students.length);
      setExamCount(exams.length);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">
        Hoş Geldin Emre 👋
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Toplam Öğrenci"
          value={studentCount}
          icon={<Users size={28} />}
          color="bg-blue-600"
        />

        <StatsCard
          title="Toplam Deneme"
          value={examCount}
          icon={<ClipboardList size={28} />}
          color="bg-purple-600"
        />

        <StatsCard
          title="Toplam Koç"
          value={0}
          icon={<UserRound size={28} />}
          color="bg-green-600"
        />

        <StatsCard
          title="Toplam Veli"
          value={0}
          icon={<FileText size={28} />}
          color="bg-orange-600"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <RecentStudents />
        <RecentExams />
      </div>
    </>
  );
}