"use client";

import { auth } from "@/lib/firebase";

export default function Home() {
  console.log("Firebase Auth:", auth);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        Firebase Bağlandı ✅
      </h1>
    </main>
  );
}