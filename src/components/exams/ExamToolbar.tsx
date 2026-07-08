"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExamToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  examType: string;
  onExamTypeChange: (value: string) => void;

  onCreate: () => void;
}

export default function ExamToolbar({
  search,
  onSearchChange,
  examType,
  onExamTypeChange,
  onCreate,
}: ExamToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-5 shadow md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-col gap-4 md:flex-row">
        <Input
          className="md:max-w-sm"
          placeholder="Öğrenci veya deneme ara..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />

        <Select
          value={examType}
          onValueChange={(value) =>
            onExamTypeChange(value ?? "all")
          }
        >
          <SelectTrigger className="w-full md:w-40">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              Tümü
            </SelectItem>

            <SelectItem value="TYT">
              TYT
            </SelectItem>

            <SelectItem value="AYT">
              AYT
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={onCreate}>
        + Yeni Deneme
      </Button>
    </div>
  );
}