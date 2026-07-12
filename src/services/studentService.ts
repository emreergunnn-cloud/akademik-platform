import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Student } from "@/types/student";

const studentsRef = collection(db, "students");

// Öğrenci Ekle
export async function addStudent(student: Student) {
  await addDoc(studentsRef, {
    ...student,
    createdAt: serverTimestamp(),
  });
}

// Öğrencileri Getir
export async function getStudents(): Promise<Student[]> {
  const q = query(
    studentsRef,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Student, "id">),
  }));
}

// Tek Öğrenci Getir
export async function getStudentById(
  id: string
): Promise<Student | null> {
  const studentDoc = await getDoc(
    doc(db, "students", id)
  );

  if (!studentDoc.exists()) {
    return null;
  }

  return {
    id: studentDoc.id,
    ...(studentDoc.data() as Omit<Student, "id">),
  };
}

// Öğrenci Güncelle
export async function updateStudent(
  id: string,
  student: Partial<Student>
) {
  const studentDoc = doc(db, "students", id);

  await updateDoc(studentDoc, student);
}

// Öğrenci Sil
export async function deleteStudent(id: string) {
  const studentDoc = doc(db, "students", id);

  await deleteDoc(studentDoc);
}

// ===============================
// V2 - Öğrenci Kayıt Modeli
// ===============================

export interface CreateStudentPayload {
  student: Student;

  parentId: string;

  coachId?: string;

  packageId?: string;

  userId: string;
}

export async function createStudent(
  payload: CreateStudentPayload
) {
  return await addDoc(
  studentsRef,
  {
    ...payload.student,

    parentId: payload.parentId,

    coachId: payload.coachId ?? null,

    packageId:
      payload.packageId ?? null,

    userId: payload.userId,

    createdAt: serverTimestamp(),
  });
}