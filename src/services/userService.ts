import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { User } from "@/types/user";

const COLLECTION = "users";

export async function getUsers() {
  const snapshot = await getDocs(
    collection(db, COLLECTION)
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[];
}

export async function getUserById(
  id: string
) {
  const snapshot = await getDoc(
    doc(db, COLLECTION, id)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as User;
}

export async function addUser(
  uid: string,
  user: User
) {
  await setDoc(
    doc(db, COLLECTION, uid),
    user
  );

  return uid;
}

export async function updateUser(
  id: string,
  user: Partial<User>
) {
  await updateDoc(
    doc(db, COLLECTION, id),
    user
  );
}

export async function deleteUser(
  id: string
) {
  await deleteDoc(
    doc(db, COLLECTION, id)
  );
}