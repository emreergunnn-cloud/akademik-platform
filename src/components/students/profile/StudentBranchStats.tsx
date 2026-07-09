interface StudentBranchStatsProps {
  turkishAverage: number;
  mathAverage: number;
  scienceAverage: number;
  socialAverage: number;
}

export default function StudentBranchStats({
  turkishAverage,
  mathAverage,
  scienceAverage,
  socialAverage,
}: StudentBranchStatsProps) {
  const branches = [
    {
      title: "Türkçe",
      value: turkishAverage,
      color: "text-blue-600",
    },
    {
      title: "Matematik",
      value: mathAverage,
      color: "text-green-600",
    },
    {
      title: "Fen",
      value: scienceAverage,
      color: "text-red-600",
    },
    {
      title: "Sosyal",
      value: socialAverage,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Branş Ortalamaları
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {branches.map((branch) => (
          <div
            key={branch.title}
            className="rounded-lg border p-4"
          >
            <p className="text-sm text-slate-500">
              {branch.title}
            </p>

            <p
              className={`mt-2 text-3xl font-bold ${branch.color}`}
            >
              {branch.value.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}