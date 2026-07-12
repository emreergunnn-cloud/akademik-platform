interface StudentPredictionCardProps {
  averageNet: number;
  targetNet: number;
}

export default function StudentPredictionCard({
  averageNet,
  targetNet,
}: StudentPredictionCardProps) {
  const remaining = Math.max(
    targetNet - averageNet,
    0
  );

  const percent =
    targetNet === 0
      ? 0
      : (averageNet / targetNet) * 100;

  let status = "";
  let color = "";

  if (percent >= 100) {
    status = "🎉 Hedefe ulaşıldı.";
    color = "text-green-600";
  } else if (percent >= 80) {
    status =
      "🚀 Hedefe çok yakın.";
    color = "text-blue-600";
  } else if (percent >= 60) {
    status =
      "📈 Düzenli çalışmayla ulaşılabilir.";
    color = "text-yellow-600";
  } else {
    status =
      "⚠️ Çalışma temposu artırılmalı.";
    color = "text-red-600";
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        🎯 Hedef Tahmini
      </h2>

      <div className="space-y-3">

        <p>
          <strong>Mevcut Ortalama:</strong>{" "}
          {averageNet.toFixed(2)}
        </p>

        <p>
          <strong>Hedef Net:</strong>{" "}
          {targetNet.toFixed(2)}
        </p>

        <p>
          <strong>Kalan Net:</strong>{" "}
          {remaining.toFixed(2)}
        </p>

        <p className={color}>
          {status}
        </p>

      </div>
    </div>
  );
}