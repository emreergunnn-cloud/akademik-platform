interface StudentStatsCardProps {
  totalExam: number;
  averageNet: number;
  highestNet: number;
}

export default function StudentStatsCard({
  totalExam,
  averageNet,
  highestNet,
}: StudentStatsCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        İstatistikler
      </h2>

      <div className="space-y-3">
        <p>
          <strong>Toplam Deneme:</strong>{" "}
          {totalExam}
        </p>

        <p>
          <strong>Ortalama Net:</strong>{" "}
          {averageNet.toFixed(2)}
        </p>

        <p>
          <strong>En Yüksek Net:</strong>{" "}
          {highestNet.toFixed(2)}
        </p>
      </div>
    </div>
  );
}