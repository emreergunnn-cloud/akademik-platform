"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  addExam,
  updateExam,
} from "@/services/examService";

import { getStudents } from "@/services/studentService";

import { Exam } from "@/types/exam";
import { Student } from "@/types/student";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExamFormProps {
  exam?: Exam | null;
  onSuccess?: () => void;
}

const initialForm: Exam = {
  studentId: "",
  studentName: "",

  examName: "",
  examType: "TYT",

  examDate: "",

  turkish: 0,
  social: 0,
  math: 0,
  science: 0,

  totalNet: 0,
};

export default function ExamForm({
  exam,
  onSuccess,
}: ExamFormProps) {
  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState<Student[]>([]);

  const [form, setForm] =
    useState<Exam>(initialForm);

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadStudents();
  }, []);

  useEffect(() => {
    if (exam) {
      setForm(exam);
    } else {
      setForm(initialForm);
    }
  }, [exam]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      !form.studentId ||
      !form.examName ||
      !form.examDate
    ) {
      toast.error("Lütfen gerekli alanları doldurun.");
      return;
    }

    const totalNet =
      form.turkish +
      form.social +
      form.math +
      form.science;

    try {
      setLoading(true);

      if (exam?.id) {
        await updateExam(exam.id, {
          ...form,
          totalNet,
        });

        toast.success(
          "Deneme başarıyla güncellendi."
        );
      } else {
        await addExam({
          ...form,
          totalNet,
        });

        toast.success(
          "Deneme başarıyla eklendi."
        );
      }

      setForm(initialForm);

      onSuccess?.();
    } catch (error) {
      console.error(error);

      toast.error("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Select
        value={form.studentId}
        onValueChange={(value) => {
          const student = students.find(
            (s) => s.id === value
          );

          if (!student) return;

          setForm((prev) => ({
            ...prev,
            studentId: student.id!,
            studentName: student.name,
          }));
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Öğrenci Seçiniz" />
        </SelectTrigger>

        <SelectContent>
          {students.map((student) => (
            <SelectItem
              key={student.id}
              value={student.id!}
            >
              {student.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={form.examType}
        onValueChange={(value) =>
          setForm((prev) => ({
            ...prev,
            examType: value as "TYT" | "AYT",
          }))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="TYT">
            TYT
          </SelectItem>

          <SelectItem value="AYT">
            AYT
          </SelectItem>
        </SelectContent>
      </Select>

      <Input
        name="examName"
        placeholder="Deneme Adı"
        value={form.examName}
        onChange={handleChange}
      />

      <Input
        type="date"
        name="examDate"
        value={form.examDate}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="turkish"
        placeholder="Türkçe Neti"
        value={form.turkish}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="social"
        placeholder="Sosyal Neti"
        value={form.social}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="math"
        placeholder="Matematik Neti"
        value={form.math}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="science"
        placeholder="Fen Neti"
        value={form.science}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading
          ? "Kaydediliyor..."
          : exam
          ? "Denemeyi Güncelle"
          : "Denemeyi Kaydet"}
      </Button>
    </form>
  );
}