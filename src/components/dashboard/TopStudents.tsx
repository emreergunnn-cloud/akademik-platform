interface TopStudent {
  id?: string;
  name: string;
  averageNet: number;
}

interface TopStudentsProps {
  students: TopStudent[];
}

export default function TopStudents({
  students,
}: TopStudentsProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-semibold">
        🏆 En Başarılı Öğrenciler
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
                Ortalama Net
              </p>
            </div>

            <div className="text-right">
              <p className="text-right text-2xl font-bold text-blue-600">
  {student.averageNet.toFixed(2)}
</p>

<p className="text-xs text-slate-500">
  Ortalama Net
</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}