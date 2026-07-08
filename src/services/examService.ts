import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Exam } from "@/types/exam";

const examsRef = collection(db, "exams");

// Deneme Ekle
export async function addExam(exam: Exam) {
  await addDoc(examsRef, {
    ...exam,
    createdAt: serverTimestamp(),
  });
}

// Denemeleri Getir
export async function getExams(): Promise<Exam[]> {
  const q = query(
    examsRef,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Exam, "id">),
  }));
}

// Öğrenciye Ait Denemeleri Getir
export async function getStudentExams(
  studentId: string
): Promise<Exam[]> {
  const q = query(
    examsRef,
    where("studentId", "==", studentId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Exam, "id">),
  }));
}

// Deneme Güncelle
export async function updateExam(
  id: string,
  exam: Partial<Exam>
) {
  const examDoc = doc(db, "exams", id);

  await updateDoc(examDoc, exam);
}

// Deneme Sil
export async function deleteExam(id: string) {
  const examDoc = doc(db, "exams", id);

  await deleteDoc(examDoc);
}