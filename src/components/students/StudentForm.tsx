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

const initialStudent: Student = {
  name: "",
  school: "",
  className: "",
  phone: "",
  targetNet: 0,
};

export default function StudentForm({
  student,
  onSuccess,
}: StudentFormProps) {
  const [loading, setLoading] = useState(false);

  const [studentForm, setStudentForm] =
    useState<Student>(initialStudent);

  const [parentName, setParentName] =
    useState("");

  const [parentPhone, setParentPhone] =
    useState("");

  useEffect(() => {
    if (student) {
      setStudentForm(student);
    } else {
      setStudentForm(initialStudent);
    }
  }, [student]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudentForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !studentForm.name ||
      !studentForm.school ||
      !studentForm.className ||
      !studentForm.phone ||
      !parentName ||
      !parentPhone ||
      studentForm.targetNet <= 0
    ) {
      toast.error(
        "Lütfen tüm alanları doldurun ve hedef net girin."
      );
      return;
    }

    try {
      setLoading(true);

      if (studentForm.id) {
        await updateStudent(
          studentForm.id,
          studentForm
        );

        toast.success(
          "Öğrenci başarıyla güncellendi."
        );
      } else {
        await addStudent(studentForm);

        toast.success(
          "Öğrenci başarıyla eklendi."
        );
      }

      setStudentForm(initialStudent);
      setParentName("");
      setParentPhone("");

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
        value={studentForm.name}
        onChange={handleChange}
      />

      <Input
        name="school"
        placeholder="Okul"
        value={studentForm.school}
        onChange={handleChange}
      />

      <Input
        name="className"
        placeholder="Sınıf"
        value={studentForm.className}
        onChange={handleChange}
      />

      <Input
        name="phone"
        placeholder="Telefon"
        value={studentForm.phone}
        onChange={handleChange}
      />

      <Input
        placeholder="Veli Adı"
        value={parentName}
        onChange={(e) =>
          setParentName(e.target.value)
        }
      />

      <Input
        placeholder="Veli Telefonu"
        value={parentPhone}
        onChange={(e) =>
          setParentPhone(e.target.value)
        }
      />

      <Input
        name="targetNet"
        type="number"
        placeholder="Hedef Net"
        value={studentForm.targetNet}
        onChange={(e) =>
          setStudentForm((prev) => ({
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
          : studentForm.id
          ? "Güncelle"
          : "Öğrenciyi Kaydet"}
      </Button>
    </form>
  );
}