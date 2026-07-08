export default function AdminPage() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8">
        Hoş Geldin Emre 👋
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-slate-600">
            Toplam Öğrenci
          </h2>

          <p className="mt-4 text-5xl font-bold text-blue-600">
            0
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-slate-600">
            Toplam Koç
          </h2>

          <p className="mt-4 text-5xl font-bold text-green-600">
            0
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-slate-600">
            Toplam Veli
          </h2>

          <p className="mt-4 text-5xl font-bold text-orange-600">
            0
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-slate-600">
            Toplam Deneme
          </h2>

          <p className="mt-4 text-5xl font-bold text-purple-600">
            0
          </p>
        </div>

      </div>
    </>
  );
}