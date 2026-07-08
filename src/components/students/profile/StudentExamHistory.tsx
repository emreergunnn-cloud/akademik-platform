import { Exam } from "@/types/exam";

interface StudentExamHistoryProps {
  exams: Exam[];
}

export default function StudentExamHistory({
  exams,
}: StudentExamHistoryProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Son Denemeler
      </h2>

      {exams.length === 0 ? (
        <p className="text-slate-500">
          Bu öğrenciye ait deneme bulunmuyor.
        </p>
      ) : (
        <div className="space-y-3">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-medium">
                  {exam.examName}
                </p>

                <p className="text-sm text-slate-500">
                  {exam.examType} • {exam.examDate}
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {exam.totalNet} Net
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}