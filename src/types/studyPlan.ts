export interface StudyPlan {
  id?: string;

  studentId: string;

  day:
    | "Pazartesi"
    | "Salı"
    | "Çarşamba"
    | "Perşembe"
    | "Cuma"
    | "Cumartesi"
    | "Pazar";

  title: string;

  completed: boolean;

  createdAt?: unknown;
}