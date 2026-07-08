"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import StudentForm from "@/components/students/StudentForm";

import { Student } from "@/types/student";

interface StudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  student?: Student | null;
}

export default function StudentDialog({
  open,
  onOpenChange,
  onSuccess,
  student,
}: StudentDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {student
              ? "Öğrenciyi Düzenle"
              : "Yeni Öğrenci"}
          </DialogTitle>
        </DialogHeader>

        <StudentForm
          student={student}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}