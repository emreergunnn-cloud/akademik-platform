"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  ClipboardList,
  UserRound,
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
      title: "Veliler",
      href: "/admin/parents",
      icon: UserRound,
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
    <aside className="min-h-screen w-64 bg-slate-900 p-6 text-white">
      <h1 className="mb-10 text-2xl font-bold">
        Akademik Platform
      </h1>

      <nav className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          const active =
            pathname === menu.href ||
            (menu.href !== "/admin" &&
              pathname.startsWith(menu.href));

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-lg p-3 transition ${
                active
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              <span>{menu.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}