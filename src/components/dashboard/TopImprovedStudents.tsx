interface TopImprovedStudent {
  id?: string;
  name: string;
  improvement: number;
}

interface TopImprovedStudentsProps {
  students: TopImprovedStudent[];
}

export default function TopImprovedStudents({
  students,
}: TopImprovedStudentsProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-semibold">
        🔥 En Çok Gelişen Öğrenciler
      </h2>

      <div className="space-y-4">
        {students.slice(0, 5).map((student, index) => (
          <div
            key={student.id ?? index}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <p className="flex items-center gap-2 font-semibold">
  <span>
    {index === 0
      ? "🥇"
      : index === 1
      ? "🥈"
      : index === 2
      ? "🥉"
      : "🏅"}
  </span>

  {student.name}
</p>

              <p className="text-sm text-slate-500">
  Son iki denemeye göre gelişim
</p>
            </div>

            <div
              className={`text-2xl font-bold ${
                student.improvement >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {student.improvement >= 0 ? "+" : ""}
              {student.improvement.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}