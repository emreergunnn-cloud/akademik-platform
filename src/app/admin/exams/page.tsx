"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Exam } from "@/types/exam";

import {
  deleteExam,
  getExams,
} from "@/services/examService";

import ExamDialog from "@/components/exams/ExamDialog";
import ExamTable from "@/components/exams/ExamTable";
import DeleteExamDialog from "@/components/exams/DeleteExamDialog";

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [selectedExam, setSelectedExam] =
    useState<Exam | null>(null);

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

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Denemeler
        </h1>

        <button
          onClick={handleCreate}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          + Yeni Deneme
        </button>
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
          exams={exams}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}