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
import { StudyPlan } from "@/types/studyPlan";

const studyPlansRef =
  collection(db, "studyPlans");

export async function addStudyPlan(
  plan: StudyPlan
) {
  await addDoc(studyPlansRef, {
    ...plan,
    createdAt: serverTimestamp(),
  });
}

export async function getStudentStudyPlans(
  studentId: string
): Promise<StudyPlan[]> {
  const q = query(
    studyPlansRef,
    where("studentId", "==", studentId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<
      StudyPlan,
      "id"
    >),
  }));
}

export async function updateStudyPlan(
  id: string,
  completed: boolean
) {
  await updateDoc(
    doc(db, "studyPlans", id),
    {
      completed,
    }
  );
}

export async function deleteStudyPlan(
  id: string
) {
  await deleteDoc(
    doc(db, "studyPlans", id)
  );
}