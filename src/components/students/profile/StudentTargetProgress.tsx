interface StudentTargetProgressProps {
  averageNet: number;
  targetNet?: number;
}

export default function StudentTargetProgress({
  averageNet,
  targetNet,
}: StudentTargetProgressProps) {
  const safeTarget = targetNet ?? 0;

  const progress =
    safeTarget > 0
      ? Math.min((averageNet / safeTarget) * 100, 100)
      : 0;

  const remaining = Math.max(
    safeTarget - averageNet,
    0
  );

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        🎯 Hedef Net Takibi
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Ortalama Net</span>
          <strong>{averageNet.toFixed(2)}</strong>
        </div>

        <div className="flex justify-between text-sm">
          <span>Hedef Net</span>
          <strong>{safeTarget.toFixed(2)}</strong>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="flex justify-between text-sm">
          <span>İlerleme</span>
          <strong>{progress.toFixed(0)}%</strong>
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <p className="font-medium">
            Hedefe ulaşmak için yaklaşık{" "}
            <strong>{remaining.toFixed(2)}</strong> net
            gerekiyor.
          </p>
        </div>
      </div>
    </div>
  );
}