"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/services/authService";
import { getUserById } from "@/services/userService";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("FORM SUBMIT ÇALIŞTI");

    try {
      setLoading(true);

      const firebaseUser = await login(email, password);

      console.log("AUTH USER:", firebaseUser);

      const user = await getUserById(firebaseUser.uid);

      console.log("FIRESTORE USER:", user);

      if (!user) {
        alert("Firestore'da kullanıcı bulunamadı.");
        return;
      }

      switch (user.role) {
        case "superadmin":
        case "admin":
        case "secretary":
        case "coach":
          router.push("/admin");
          break;

        case "parent":
          router.push("/parent");
          break;

        case "student":
          router.push("/student");
          break;

        default:
          alert("Yetkiniz bulunmuyor.");
      }
    } catch (err) {
      console.error(err);
      alert("Giriş başarısız.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">
          Giriş Yap
        </h1>

        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-3"
        />

        <div className="h-4" />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}