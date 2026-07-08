export interface Exam {
  id?: string;

  studentId: string;

  studentName: string;

  examName: string;

  examType: "TYT" | "AYT";

  examDate: string;

  turkish: number;

  social: number;

  math: number;

  science: number;

  totalNet: number;

  createdAt?: unknown;
}