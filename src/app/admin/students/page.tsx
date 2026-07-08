"use client";

import { useEffect, useMemo, useState } from "react";

import { toast } from "sonner";

import StudentDialog from "@/components/students/StudentDialog";
import StudentTable from "@/components/students/StudentTable";
import DeleteStudentDialog from "@/components/students/DeleteStudentDialog";
import StudentToolbar from "@/components/students/StudentToolbar";

import {
  deleteStudent,
  getStudents,
} from "@/services/studentService";

import { Student } from "@/types/student";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  async function loadStudents() {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
      toast.error("Öğrenciler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return students;

    return students.filter((student) =>
      [
        student.name,
        student.school,
        student.phone,
        student.parentName,
      ]
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [students, search]);

  function handleCreate() {
    setSelectedStudent(null);
    setDialogOpen(true);
  }

  function handleEdit(student: Student) {
    setSelectedStudent(student);
    setDialogOpen(true);
  }

  function handleDelete(student: Student) {
    setSelectedStudent(student);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!selectedStudent?.id) return;

    try {
      await deleteStudent(selectedStudent.id);

      toast.success("Öğrenci başarıyla silindi.");

      setDeleteDialogOpen(false);
      setSelectedStudent(null);

      await loadStudents();
    } catch (error) {
      console.error(error);

      toast.error(
        "Öğrenci silinirken hata oluştu."
      );
    }
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-6 text-4xl font-bold">
          Öğrenciler
        </h1>

        <StudentToolbar
          search={search}
          onSearchChange={setSearch}
          onCreate={handleCreate}
        />
      </div>

      <StudentDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);

          if (!open) {
            setSelectedStudent(null);
          }
        }}
        student={selectedStudent}
        onSuccess={() => {
          setDialogOpen(false);
          setSelectedStudent(null);
          loadStudents();
        }}
      />

      <DeleteStudentDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
      />

      {loading ? (
        <div className="rounded-xl bg-white p-6 shadow">
          Yükleniyor...
        </div>
      ) : (
        <StudentTable
          students={filteredStudents}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </>
  );
}