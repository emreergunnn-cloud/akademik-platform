"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  addStudent,
  updateStudent,
} from "@/services/studentService";

import { Student } from "@/types/student";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StudentFormProps {
  student?: Student | null;
  onSuccess?: () => void;
}

const initialForm: Student = {
  name: "",
  school: "",
  className: "",
  phone: "",
  parentName: "",
  parentPhone: "",
  targetNet: 0,
};

export default function StudentForm({
  student,
  onSuccess,
}: StudentFormProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] =
    useState<Student>(initialForm);

  useEffect(() => {
    if (student) {
      setForm(student);
    } else {
      setForm(initialForm);
    }
  }, [student]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
  !form.name ||
  !form.school ||
  !form.className ||
  !form.phone ||
  !form.parentName ||
  !form.parentPhone ||
  form.targetNet <= 0
) {
      toast.error("Lütfen tüm alanları doldurun ve hedef net girin.");
      return;
    }

    try {
      setLoading(true);

      if (form.id) {
        await updateStudent(form.id, form);

        toast.success(
          "Öğrenci başarıyla güncellendi."
        );
      } else {
        await addStudent(form);

        toast.success(
          "Öğrenci başarıyla eklendi."
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        name="name"
        placeholder="Ad Soyad"
        value={form.name}
        onChange={handleChange}
      />

      <Input
        name="school"
        placeholder="Okul"
        value={form.school}
        onChange={handleChange}
      />

      <Input
        name="className"
        placeholder="Sınıf"
        value={form.className}
        onChange={handleChange}
      />

      <Input
        name="phone"
        placeholder="Telefon"
        value={form.phone}
        onChange={handleChange}
      />

      <Input
        name="parentName"
        placeholder="Veli Adı"
        value={form.parentName}
        onChange={handleChange}
      />

      <Input
        name="parentPhone"
        placeholder="Veli Telefonu"
        value={form.parentPhone}
        onChange={handleChange}
      />
      <Input
  name="targetNet"
  type="number"
  placeholder="Hedef Net"
  value={form.targetNet}
  onChange={(e) =>
    setForm((prev) => ({
      ...prev,
      targetNet: Number(e.target.value),
    }))
  }
/>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading
          ? "Kaydediliyor..."
          : form.id
          ? "Güncelle"
          : "Öğrenciyi Kaydet"}
      </Button>
    </form>
  );
}