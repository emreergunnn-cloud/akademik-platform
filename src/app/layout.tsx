import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Akademik Platform",
  description: "Akademik Koçluk Yönetim Paneli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        {children}

        <Toaster
          richColors
          position="top-right"
        />
      </body>
    </html>
  );
}