export default function Navbar() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">

      <h2 className="text-2xl font-bold">
        Admin Paneli
      </h2>

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          E
        </div>

        <span className="font-medium">
          Emre
        </span>

      </div>

    </header>
  );
}