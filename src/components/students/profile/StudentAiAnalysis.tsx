import { Exam } from "@/types/exam";

interface StudentAiAnalysisProps {
  averageNet: number;
  highestNet: number;
  totalExam: number;
  exams: Exam[];
}

export default function StudentAiAnalysis({
  averageNet,
  highestNet,
  totalExam,
  exams,
}: StudentAiAnalysisProps) {
  let message = "";

  const sortedExams = [...exams].sort(
  (a, b) =>
    new Date(a.examDate).getTime() -
    new Date(b.examDate).getTime()
);

const latestExam =
  sortedExams[sortedExams.length - 1];

const previousExam =
  sortedExams[sortedExams.length - 2];

const improvement =
  latestExam && previousExam
    ? latestExam.totalNet -
      previousExam.totalNet
    : 0;

    const branchAverages = {
  Türkçe: averageNet === 0
    ? 0
    : exams.reduce(
        (sum, exam) => sum + exam.turkish,
        0
      ) / exams.length,

  Matematik: averageNet === 0
    ? 0
    : exams.reduce(
        (sum, exam) => sum + exam.math,
        0
      ) / exams.length,

  Fen: averageNet === 0
    ? 0
    : exams.reduce(
        (sum, exam) => sum + exam.science,
        0
      ) / exams.length,

  Sosyal: averageNet === 0
    ? 0
    : exams.reduce(
        (sum, exam) => sum + exam.social,
        0
      ) / exams.length,
};

const strongestBranch = Object.entries(
  branchAverages
).sort(
  (a, b) => b[1] - a[1]
)[0];

const weakestBranch = Object.entries(
  branchAverages
).sort(
  (a, b) => a[1] - b[1]
)[0];

if (totalExam === 0) {
  message =
    "Henüz deneme bulunmuyor. İlk denemeden sonra analiz oluşturulacak.";
} else if (averageNet >= 90) {
  message =
    "🔥 Öğrenci hedef seviyeye çok yakın. Düzenli tekrarlarla başarısını koruyabilir.";
} else if (averageNet >= 70) {
  message =
    "📈 Performans iyi seviyede. Branş bazlı eksikler kapatılırsa hedef nete ulaşabilir.";
} else if (averageNet >= 50) {
  message =
    "📚 Temel başarı oluşmuş durumda. Düzenli deneme ve konu tekrarı önerilir.";
} else {
  message =
    "⚠️ Net ortalaması düşük. Temel konu eksikleri tamamlanmalı ve günlük soru çözümü artırılmalı.";
}
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        🤖 AI Akademik Koç
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
  <p>{message}</p>

  {totalExam >= 2 && (
    <p className="font-medium text-blue-700">
      {improvement >= 0
        ? `📈 Son denemeye göre ${improvement.toFixed(
            2
          )} net yükseliş var.`
        : `📉 Son denemeye göre ${Math.abs(
            improvement
          ).toFixed(2)} net düşüş var.`}
    </p>
  )}
</div>

        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
          <p>
            <strong>Ortalama Net:</strong>{" "}
            {averageNet.toFixed(2)}
          </p>

          <p>
            <strong>En Yüksek Net:</strong>{" "}
            {highestNet.toFixed(2)}
          </p>

          <p>
            <strong>Toplam Deneme:</strong>{" "}
            {totalExam}
          </p>

          <p>
  <strong>Başarı Seviyesi:</strong>{" "}
  {averageNet >= 90
    ? "Mükemmel"
    : averageNet >= 70
    ? "İyi"
    : averageNet >= 50
    ? "Orta"
    : "Geliştirilmeli"}
</p>

<p>
  <strong>En Güçlü Branş:</strong>{" "}
  {strongestBranch[0]} (
  {strongestBranch[1].toFixed(2)})
</p>

<p>
  <strong>Geliştirilmesi Gereken:</strong>{" "}
  {weakestBranch[0]} (
  {weakestBranch[1].toFixed(2)})
</p>
        </div>
      </div>
    </div>
  );
}