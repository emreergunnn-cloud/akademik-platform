import { getStudents } from "@/services/studentService";
import { getExams } from "@/services/examService";
import { groupExamsByName } from "@/utils/groupExams";

export async function getDashboardData() {
  const students = await getStudents();
  const exams = await getExams();

  // Platform Ortalama Net
  const averageNet =
    exams.length === 0
      ? 0
      : exams.reduce(
          (sum, exam) => sum + exam.totalNet,
          0
        ) / exams.length;

  // En Başarılı Öğrenciler
  const topStudents = students
    .map((student) => {
      const studentExams = exams.filter(
        (exam) => exam.studentId === student.id
      );

      if (studentExams.length === 0) {
        return {
          ...student,
          averageNet: 0,
        };
      }

      const avg =
        studentExams.reduce(
          (sum, exam) => sum + exam.totalNet,
          0
        ) / studentExams.length;

      return {
        ...student,
        averageNet: avg,
      };
    })
    .sort(
      (a, b) => b.averageNet - a.averageNet
    );

  // En Çok Gelişen Öğrenciler
  const topImprovedStudents = students
    .map((student) => {
      const studentExams = exams
        .filter(
          (exam) => exam.studentId === student.id
        )
        .sort(
          (a, b) =>
            new Date(a.createdAt as any).getTime() -
            new Date(b.createdAt as any).getTime()
        );

      if (studentExams.length < 2) {
        return {
          id: student.id,
          name: student.name,
          improvement: 0,
        };
      }

      const previous =
        studentExams[studentExams.length - 2];

      const latest =
        studentExams[studentExams.length - 1];

      return {
        id: student.id,
        name: student.name,
        improvement:
          latest.totalNet - previous.totalNet,
      };
    })
    .sort(
      (a, b) =>
        b.improvement - a.improvement
    );

  // Grafik Verisi
  const averageNetChart =
  groupExamsByName(exams);

  const branchNetChart = [
  {
    branch: "Türkçe",
    average:
      exams.length === 0
        ? 0
        : exams.reduce(
            (sum, exam) => sum + exam.turkish,
            0
          ) / exams.length,
  },
  {
    branch: "Matematik",
    average:
      exams.length === 0
        ? 0
        : exams.reduce(
            (sum, exam) => sum + exam.math,
            0
          ) / exams.length,
  },
  {
    branch: "Fen",
    average:
      exams.length === 0
        ? 0
        : exams.reduce(
            (sum, exam) => sum + exam.science,
            0
          ) / exams.length,
  },
  {
    branch: "Sosyal",
    average:
      exams.length === 0
        ? 0
        : exams.reduce(
            (sum, exam) => sum + exam.social,
            0
          ) / exams.length,
  },
];

  return {
  students,
  exams,
  averageNet,
  topStudents,
  topImprovedStudents,
  averageNetChart,
  branchNetChart,
};
}