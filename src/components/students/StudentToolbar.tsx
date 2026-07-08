"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StudentToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
}

export default function StudentToolbar({
  search,
  onSearchChange,
  onCreate,
}: StudentToolbarProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <Input
          placeholder="Öğrenci ara..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-10"
        />
      </div>

      <Button onClick={onCreate}>
        + Yeni Öğrenci
      </Button>
    </div>
  );
}