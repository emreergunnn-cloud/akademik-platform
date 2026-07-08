interface StudentInfoCardProps {
  phone: string;
  school: string;
  className: string;
  parentName: string;
}

export default function StudentInfoCard({
  phone,
  school,
  className,
  parentName,
}: StudentInfoCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Öğrenci Bilgileri
      </h2>

      <div className="space-y-3">
        <p>
          <strong>Telefon:</strong> {phone}
        </p>

        <p>
          <strong>Okul:</strong> {school}
        </p>

        <p>
          <strong>Sınıf:</strong> {className}
        </p>

        <p>
          <strong>Veli:</strong> {parentName}
        </p>
      </div>
    </div>
  );
}