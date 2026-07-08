"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Student } from "@/types/student";

import {
  deleteStudent,
  getStudents,
} from "@/services/studentService";

import StudentToolbar from "@/components/students/StudentToolbar";
import StudentTable from "@/components/students/StudentTable";
import StudentDialog from "@/components/students/StudentDialog";
import DeleteStudentDialog from "@/components/students/DeleteStudentDialog";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const data = await getStudents();

      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(value: string) {
    setSearch(value);

    const filtered = students.filter((student) => {
      return (
        student.name
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        student.school
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        student.parentName
          .toLowerCase()
          .includes(value.toLowerCase())
      );
    });

    setFilteredStudents(filtered);
  }

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

      toast.error("Öğrenci silinirken hata oluştu.");
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
          onSearchChange={handleSearch}
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
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}