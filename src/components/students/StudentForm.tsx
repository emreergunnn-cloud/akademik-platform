"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { updateStudent } from "@/services/studentService";
import { registerStudent } from "@/services/registerStudentService";

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
      setParentName("");
      setParentPhone("");
    }
  }, [student]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setStudentForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "targetNet"
          ? Number(e.target.value)
          : e.target.value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
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
      toast.error("Tüm alanları doldurun.");
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
          "Öğrenci güncellendi."
        );
      } else {
        const studentMail =
          studentForm.phone.replace(/\D/g, "") +
          "@student.local";

        const parentMail =
          parentPhone.replace(/\D/g, "") +
          "@parent.local";

        await registerStudent({
          student: studentForm,

          parent: {
            name: parentName,
            phone: parentPhone,
            studentId: "",
            studentName: studentForm.name,
            email: parentMail,
            password: "123456",
          },

          studentUser: {
  name: studentForm.name,
  email: studentMail,
  role: "student",
},

          parentUser: {
  name: parentName,
  email: parentMail,
  role: "parent",
},
        });

        toast.success(
          "Öğrenci başarıyla oluşturuldu."
        );
      }

      setStudentForm(initialStudent);
      setParentName("");
      setParentPhone("");

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Kayıt oluşturulamadı.");
    } finally {
      setLoading(false);
    }
  }

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
        onChange={handleChange}
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