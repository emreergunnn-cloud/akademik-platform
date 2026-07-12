"use client";

import { useState } from "react";

import { registerAuthUser } from "@/services/authService";
import { addUser } from "@/services/userService";

export default function SetupAdminPage() {
  const [loading, setLoading] = useState(false);

  async function createAdmin() {
    try {
      setLoading(true);

      const email = "admin@akademikplatform.com";
      const password = "Akd2026!";

      const authUser = await registerAuthUser(
        email,
        password
      );

      await addUser(authUser.uid, {
        name: "Süper Admin",
        email,
        role: "superadmin",
      });

      alert("Admin oluşturuldu.");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={createAdmin}
        disabled={loading}
        className="rounded bg-blue-600 px-6 py-3 text-white"
      >
        {loading
          ? "Oluşturuluyor..."
          : "İlk Admini Oluştur"}
      </button>
    </div>
  );
}