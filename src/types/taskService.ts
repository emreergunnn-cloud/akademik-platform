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
import { Task } from "@/types/task";

const tasksRef = collection(db, "tasks");

// Görev Ekle
export async function addTask(task: Task) {
  await addDoc(tasksRef, {
    ...task,
    createdAt: serverTimestamp(),
  });
}

// Öğrenci Görevleri
export async function getStudentTasks(
  studentId: string
): Promise<Task[]> {
  const q = query(
    tasksRef,
    where("studentId", "==", studentId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Task, "id">),
  }));
}

// Tamamlandı
export async function completeTask(
  id: string,
  completed: boolean
) {
  await updateDoc(
    doc(db, "tasks", id),
    {
      completed,
    }
  );
}

// Sil
export async function deleteTask(
  id: string
) {
  await deleteDoc(
    doc(db, "tasks", id)
  );
}