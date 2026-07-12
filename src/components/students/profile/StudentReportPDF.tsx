"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Student } from "@/types/student";
import { Exam } from "@/types/exam";

interface Props {
  student: Student;
  exams: Exam[];
}

export default function StudentReportPDF({
  student,
  exams,
}: Props) {
  function generatePDF() {
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text("Akademik Performans Raporu", 14, 20);

    pdf.setFontSize(12);

    pdf.text(
      `Ogrenci: ${student.name}`,
      14,
      35
    );

    pdf.text(
      `Okul: ${student.school}`,
      14,
      43
    );

    pdf.text(
      `Sinif: ${student.className}`,
      14,
      51
    );

    const average =
      exams.length === 0
        ? 0
        : exams.reduce(
            (sum, exam) =>
              sum + exam.totalNet,
            0
          ) / exams.length;

    const highest =
      exams.length === 0
        ? 0
        : Math.max(
            ...exams.map(
              (exam) => exam.totalNet
            )
          );

    pdf.text(
      `Deneme Sayisi: ${exams.length}`,
      14,
      66
    );

    pdf.text(
      `Ortalama Net: ${average.toFixed(
        2
      )}`,
      14,
      74
    );

    pdf.text(
      `En Yuksek Net: ${highest.toFixed(
        2
      )}`,
      14,
      82
    );

    autoTable(pdf, {
      startY: 95,

      head: [
        [
          "Deneme",
          "Turkce",
          "Matematik",
          "Fen",
          "Sosyal",
          "Toplam",
        ],
      ],

      body: exams.map((exam) => [
        exam.examName,
        exam.turkish,
        exam.math,
        exam.science,
        exam.social,
        exam.totalNet,
      ]),
    });

    pdf.save(
      `${student.name}-rapor.pdf`
    );
  }

  return (
    <button
      onClick={generatePDF}
      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      📄 PDF Raporu İndir
    </button>
  );
}