"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Exam } from "@/types/exam";
import ExamForm from "@/components/exams/ExamForm";

interface ExamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exam?: Exam | null;
  onSuccess: () => void;
}

export default function ExamDialog({
  open,
  onOpenChange,
  exam,
  onSuccess,
}: ExamDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {exam
              ? "Denemeyi Düzenle"
              : "Yeni Deneme"}
          </DialogTitle>
        </DialogHeader>

        <ExamForm
          exam={exam}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}