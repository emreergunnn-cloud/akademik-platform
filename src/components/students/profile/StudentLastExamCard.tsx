import { Exam } from "@/types/exam";

interface StudentLastExamCardProps {
  exams: Exam[];
}

export default function StudentLastExamCard({
  exams,
}: StudentLastExamCardProps) {
  if (exams.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          📝 Son Deneme
        </h2>

        <p>Henüz deneme bulunmuyor.</p>
      </div>
    );
  }

  const latestExam = [...exams].sort(
    (a, b) =>
      new Date(b.examDate).getTime() -
      new Date(a.examDate).getTime()
  )[0];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        📝 Son Deneme Özeti
      </h2>

      <div className="space-y-3">

        <p>
          <strong>Sınav:</strong>{" "}
          {latestExam.examName}
        </p>

        <p>
          <strong>Tarih:</strong>{" "}
          {latestExam.examDate}
        </p>

        <p>
          <strong>Toplam Net:</strong>{" "}
          {latestExam.totalNet.toFixed(2)}
        </p>

        <hr />

        <p>📖 Türkçe : {latestExam.turkish}</p>

        <p>➗ Matematik : {latestExam.math}</p>

        <p>🔬 Fen : {latestExam.science}</p>

        <p>🌍 Sosyal : {latestExam.social}</p>

      </div>
    </div>
  );
}