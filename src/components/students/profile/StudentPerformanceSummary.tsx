interface StudentPerformanceSummaryProps {
  averageNet: number;
  highestNet: number;
  totalExam: number;
}

export default function StudentPerformanceSummary({
  averageNet,
  highestNet,
  totalExam,
}: StudentPerformanceSummaryProps) {
  let message = "";

  if (totalExam === 0) {
    message =
      "Henüz deneme bulunmuyor. İlk denemeden sonra analiz oluşturulacaktır.";
  } else if (averageNet >= 90) {
    message =
      "Öğrenci oldukça başarılı. Mevcut performansını koruması ve zor sorular üzerinde çalışması önerilir.";
  } else if (averageNet >= 70) {
    message =
      "Genel performans iyi seviyede. Düzenli tekrarlarla üst seviyeye çıkabilir.";
  } else if (averageNet >= 50) {
    message =
      "Performans orta seviyede. Eksik branşlara ağırlık verilmesi önerilir.";
  } else {
    message =
      "Temel konuların tekrar edilmesi ve günlük soru çözümünün artırılması önerilir.";
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        📈 Performans Özeti
      </h2>

      <div className="space-y-3 text-slate-700">
        <p>
          <strong>Toplam Deneme:</strong> {totalExam}
        </p>

        <p>
          <strong>Ortalama Net:</strong>{" "}
          {averageNet.toFixed(2)}
        </p>

        <p>
          <strong>En Yüksek Net:</strong>{" "}
          {highestNet.toFixed(2)}
        </p>

        <div className="mt-5 rounded-lg bg-blue-50 p-4">
          <p className="leading-7">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}