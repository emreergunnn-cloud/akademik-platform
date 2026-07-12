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

// Öğrencinin Görevlerini Getir
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

// Görevi Tamamla / Geri Al
export async function completeTask(
  id: string,
  completed: boolean
) {
  const taskDoc = doc(db, "tasks", id);

  await updateDoc(taskDoc, {
    completed,
  });
}

// Görevi Güncelle
export async function updateTask(
  id: string,
  task: Partial<Task>
) {
  const taskDoc = doc(db, "tasks", id);

  await updateDoc(taskDoc, task);
}

// Görevi Sil
export async function deleteTask(id: string) {
  const taskDoc = doc(db, "tasks", id);

  await deleteDoc(taskDoc);
}