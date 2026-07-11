import { Exam } from "@/types/exam";

interface StudentPerformanceTrendProps {
  exams: Exam[];
}

export default function StudentPerformanceTrend({
  exams,
}: StudentPerformanceTrendProps) {
  if (exams.length < 2) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Performans Değişimi
        </h2>

        <p className="text-slate-500">
          Karşılaştırma için en az iki deneme gerekli.
        </p>
      </div>
    );
  }

  const sorted = [...exams].sort(
    (a, b) =>
      new Date(a.examDate).getTime() -
      new Date(b.examDate).getTime()
  );

  const previous = sorted[sorted.length - 2];
  const latest = sorted[sorted.length - 1];

  const difference =
    latest.totalNet - previous.totalNet;

  const increased = difference > 0;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        📈 Performans Değişimi
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-slate-100 p-4">
          <p className="text-sm text-slate-500">
            Önceki Net
          </p>

          <h3 className="text-2xl font-bold">
            {previous.totalNet.toFixed(2)}
          </h3>
        </div>

        <div className="rounded-lg bg-slate-100 p-4">
          <p className="text-sm text-slate-500">
            Son Net
          </p>

          <h3 className="text-2xl font-bold">
            {latest.totalNet.toFixed(2)}
          </h3>
        </div>

        <div
          className={`rounded-lg p-4 ${
            difference >= 0
              ? "bg-green-100"
              : "bg-red-100"
          }`}
        >
          <p className="text-sm">
            Değişim
          </p>

          <h3 className="text-2xl font-bold">
            {difference >= 0 ? "+" : ""}
            {difference.toFixed(2)}
          </h3>

          <p className="mt-2">
            {difference > 0
              ? "📈 Yükselişte"
              : difference < 0
              ? "📉 Düşüşte"
              : "➖ Sabit"}
          </p>
        </div>
      </div>
    </div>
  );
}