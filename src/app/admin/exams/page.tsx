"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Exam } from "@/types/exam";

import {
  deleteExam,
  getExams,
} from "@/services/examService";

import ExamDialog from "@/components/exams/ExamDialog";
import ExamTable from "@/components/exams/ExamTable";
import DeleteExamDialog from "@/components/exams/DeleteExamDialog";
import ExamToolbar from "@/components/exams/ExamToolbar";

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [selectedExam, setSelectedExam] =
    useState<Exam | null>(null);

  const [search, setSearch] = useState("");

  const [examType, setExamType] =
    useState("all");

  async function loadExams() {
    try {
      const data = await getExams();
      setExams(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExams();
  }, []);

  function handleCreate() {
    setSelectedExam(null);
    setDialogOpen(true);
  }

  function handleEdit(exam: Exam) {
    setSelectedExam(exam);
    setDialogOpen(true);
  }

  function handleDelete(exam: Exam) {
    setSelectedExam(exam);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!selectedExam?.id) return;

    try {
      await deleteExam(selectedExam.id);

      toast.success(
        "Deneme başarıyla silindi."
      );

      setDeleteDialogOpen(false);
      setSelectedExam(null);

      await loadExams();
    } catch (error) {
      console.error(error);

      toast.error(
        "Deneme silinirken hata oluştu."
      );
    }
  }

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesSearch =
        exam.studentName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        exam.examName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        examType === "all"
          ? true
          : exam.examType === examType;

      return matchesSearch && matchesType;
    });
  }, [exams, search, examType]);

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-6 text-4xl font-bold">
          Denemeler
        </h1>

        <ExamToolbar
          search={search}
          onSearchChange={setSearch}
          examType={examType}
          onExamTypeChange={setExamType}
          onCreate={handleCreate}
        />
      </div>

      <ExamDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);

          if (!open) {
            setSelectedExam(null);
          }
        }}
        exam={selectedExam}
        onSuccess={() => {
          setDialogOpen(false);
          setSelectedExam(null);
          loadExams();
        }}
      />

      <DeleteExamDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
      />

      {loading ? (
        <div className="rounded-xl bg-white p-6 shadow">
          Yükleniyor...
        </div>
      ) : (
        <ExamTable
          exams={filteredExams}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}