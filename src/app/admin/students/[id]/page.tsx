"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Student } from "@/types/student";
import { Exam } from "@/types/exam";

import { getStudentById } from "@/services/studentService";
import { getStudentExams } from "@/services/examService";

import StudentInfoCard from "@/components/students/profile/StudentInfoCard";
import StudentStatsCard from "@/components/students/profile/StudentStatsCard";
import StudentBranchStats from "@/components/students/profile/StudentBranchStats";
import StudentBranchAnalysis from "@/components/students/profile/StudentBranchAnalysis";
import StudentPerformanceSummary from "@/components/students/profile/StudentPerformanceSummary";
import StudentNetChart from "@/components/students/profile/StudentNetChart";
import StudentExamHistory from "@/components/students/profile/StudentExamHistory";
import StudentTargetProgress from "@/components/students/profile/StudentTargetProgress";
import StudentPerformanceTrend from "@/components/students/profile/StudentPerformanceTrend";
import StudentAiAnalysis from "@/components/students/profile/StudentAiAnalysis";
import StudentLastExamCard from "@/components/students/profile/StudentLastExamCard";
import StudentPredictionCard from "@/components/students/profile/StudentPredictionCard";
import StudentReportPDF from "@/components/students/profile/StudentReportPDF";
import StudentTaskCard from "@/components/students/profile/StudentTaskCard";
import StudyPlanCard from "@/components/students/profile/StudyPlanCard";

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

  const turkishAverage =
    totalExam === 0
      ? 0
      : exams.reduce(
          (sum, exam) => sum + exam.turkish,
          0
        ) / totalExam;

  const mathAverage =
    totalExam === 0
      ? 0
      : exams.reduce(
          (sum, exam) => sum + exam.math,
          0
        ) / totalExam;

  const scienceAverage =
    totalExam === 0
      ? 0
      : exams.reduce(
          (sum, exam) => sum + exam.science,
          0
        ) / totalExam;

  const socialAverage =
    totalExam === 0
      ? 0
      : exams.reduce(
          (sum, exam) => sum + exam.social,
          0
        ) / totalExam;

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
  <h1 className="text-4xl font-bold">
    {student.name}
  </h1>

  <StudentReportPDF
    student={student}
    exams={exams}
  />
</div>

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
        <StudentBranchStats
          turkishAverage={turkishAverage}
          mathAverage={mathAverage}
          scienceAverage={scienceAverage}
          socialAverage={socialAverage}
        />
      </div>

      <div className="mt-8">
        <StudentBranchAnalysis
          turkishAverage={turkishAverage}
          mathAverage={mathAverage}
          scienceAverage={scienceAverage}
          socialAverage={socialAverage}
        />
      </div>

      <div className="mt-8">
        <StudentPerformanceSummary
          averageNet={averageNet}
          highestNet={highestNet}
          totalExam={totalExam}
        />
      </div>

      <div className="mt-8">
        <StudentTargetProgress
        averageNet={averageNet}
        targetNet={student.targetNet}
      />
      </div>

      <div className="mt-8">
  <StudentPredictionCard
    averageNet={averageNet}
    targetNet={student.targetNet ?? 0}
  />
</div>

      <div className="mt-8">
        <StudentPerformanceTrend exams={exams} />
      </div>

      <div className="mt-8">
        <StudentAiAnalysis
  averageNet={averageNet}
  highestNet={highestNet}
  totalExam={totalExam}
  exams={exams}
/>
      </div>

      <div className="mt-8">
  <StudentLastExamCard
    exams={exams}
  />
</div>

<div className="mt-8">
  <StudentTaskCard
    studentId={student.id!}
  />
</div>

<div className="mt-8">
  <StudyPlanCard
    studentId={student.id!}
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