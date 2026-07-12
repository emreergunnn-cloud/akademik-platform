import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Parent } from "@/types/parent";

const parentsRef = collection(db, "parents");

// Veli Ekle
export async function addParent(
  parent: Parent
) {
  return await addDoc(
    parentsRef,
    {
      ...parent,
      createdAt: serverTimestamp(),
    }
  );
}

// Velileri Getir
export async function getParents(): Promise<Parent[]> {
  const snapshot = await getDocs(parentsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Parent, "id">),
  }));
}

// Öğrenciye Ait Veli
export async function getParentByStudent(
  studentId: string
): Promise<Parent | null> {
  const q = query(
    parentsRef,
    where("studentId", "==", studentId)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...(snapshot.docs[0].data() as Omit<
      Parent,
      "id"
    >),
  };
}

// Güncelle
export async function updateParent(
  id: string,
  parent: Partial<Parent>
) {
  await updateDoc(
    doc(db, "parents", id),
    parent
  );
}

// Sil
export async function deleteParent(
  id: string
) {
  await deleteDoc(
    doc(db, "parents", id)
  );
}

// Tek Veli Getir
export async function getParentById(
  id: string
): Promise<Parent | null> {
  const snapshot = await getDoc(
    doc(db, "parents", id)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<
      Parent,
      "id"
    >),
  };
}