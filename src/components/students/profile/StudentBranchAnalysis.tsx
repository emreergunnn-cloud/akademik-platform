interface StudentBranchAnalysisProps {
  turkishAverage: number;
  mathAverage: number;
  scienceAverage: number;
  socialAverage: number;
}

export default function StudentBranchAnalysis({
  turkishAverage,
  mathAverage,
  scienceAverage,
  socialAverage,
}: StudentBranchAnalysisProps) {
  const branches = [
    { name: "Türkçe", value: turkishAverage },
    { name: "Matematik", value: mathAverage },
    { name: "Fen", value: scienceAverage },
    { name: "Sosyal", value: socialAverage },
  ];

  const strongest = [...branches].sort(
    (a, b) => b.value - a.value
  )[0];

  const weakest = [...branches].sort(
    (a, b) => a.value - b.value
  )[0];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Branş Analizi
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <p className="text-sm text-green-700">
            🟢 En Güçlü Branş
          </p>

          <h3 className="mt-2 text-2xl font-bold text-green-700">
            {strongest.name}
          </h3>

          <p className="mt-1 text-lg">
            {strongest.value.toFixed(2)} Net
          </p>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-700">
            🔴 Geliştirilmesi Gereken
          </p>

          <h3 className="mt-2 text-2xl font-bold text-red-700">
            {weakest.name}
          </h3>

          <p className="mt-1 text-lg">
            {weakest.value.toFixed(2)} Net
          </p>
        </div>
      </div>
    </div>
  );
}