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
import TopStudents from "@/components/dashboard/TopStudents";
import { getDashboardData } from "@/services/dashboardService";
import TopImprovedStudents from "@/components/dashboard/TopImprovedStudents";
import AverageNetChart from "@/components/dashboard/AverageNetChart";
import BranchNetChart from "@/components/dashboard/BranchNetChart";

export default function AdminPage() {
  const [studentCount, setStudentCount] =
    useState(0);

  const [examCount, setExamCount] =
    useState(0);

  const [averageNet, setAverageNet] =
    useState(0);

  const [topStudent, setTopStudent] =
    useState("-");

    const [branchNetChart, setBranchNetChart] =
  useState<
    {
      branch: string;
      average: number;
    }[]
  >([]);

  const [averageNetChart, setAverageNetChart] =
  useState<
    {
      examName: string;
      averageNet: number;
    }[]
  >([]);

  const [topStudents, setTopStudents] =
  useState<
    {
      id?: string;
      name: string;
      averageNet: number;
    }[]
  >([]);  

  const [topImprovedStudents, setTopImprovedStudents] =
  useState<
    {
      id?: string;
      name: string;
      improvement: number;
    }[]
  >([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
  try {
    const dashboard =
      await getDashboardData();

    setStudentCount(
      dashboard.students.length
    );

    setExamCount(
      dashboard.exams.length
    );

    setAverageNet(
      dashboard.averageNet
    );

    setTopStudent(
      dashboard.topStudents.length > 0
        ? dashboard.topStudents[0].name
        : "-"
    );

    setTopStudents(
      dashboard.topStudents
    );

    setTopImprovedStudents(
      dashboard.topImprovedStudents
    );

    setAverageNetChart(
      dashboard.averageNetChart
    );

    setBranchNetChart(
      dashboard.branchNetChart
    );

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

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <StatsCard
          title="Platform Ortalama Net"
          value={averageNet.toFixed(2)}
          icon={<ClipboardList size={28} />}
          color="bg-cyan-600"
        />

        <StatsCard
          title="En Başarılı Öğrenci"
          value={topStudent}
          icon={<Users size={28} />}
          color="bg-emerald-600"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
  <RecentStudents />
  <RecentExams />
</div>

<div className="mt-8 grid gap-6 lg:grid-cols-2">
  <TopStudents
    students={topStudents}
  />

  <TopImprovedStudents
    students={topImprovedStudents}
  />
</div>

<div className="mt-8">
  <AverageNetChart
    data={averageNetChart}
  />
</div>

<div className="mt-8">
  <BranchNetChart
    data={branchNetChart}
  />
</div>
    </>
  );
}