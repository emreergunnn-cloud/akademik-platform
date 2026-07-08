"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  ClipboardList,
  Calendar,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Öğrenciler",
      href: "/admin/students",
      icon: GraduationCap,
    },
    {
      title: "Koçlar",
      href: "/admin/coaches",
      icon: Users,
    },
    {
      title: "Denemeler",
      href: "/admin/exams",
      icon: ClipboardList,
    },
    {
      title: "Program",
      href: "/admin/program",
      icon: Calendar,
    },
    {
      title: "Ayarlar",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-10">
        Akademik Platform
      </h1>

      <nav className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-lg p-3 transition ${
                pathname === menu.href
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              {menu.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}