import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Package } from "@/types/package";

const packagesRef =
  collection(db, "packages");

// Paket Ekle
export async function addPackage(
  packageData: Package
) {
  await addDoc(packagesRef, {
    ...packageData,
    createdAt: serverTimestamp(),
  });
}

// Paketler
export async function getPackages(): Promise<
  Package[]
> {
  const snapshot = await getDocs(
    packagesRef
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<
      Package,
      "id"
    >),
  }));
}

// Tek Paket
export async function getPackageById(
  id: string
): Promise<Package | null> {
  const snapshot = await getDoc(
    doc(db, "packages", id)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<
      Package,
      "id"
    >),
  };
}

// Güncelle
export async function updatePackage(
  id: string,
  packageData: Partial<Package>
) {
  await updateDoc(
    doc(db, "packages", id),
    packageData
  );
}

// Sil
export async function deletePackage(
  id: string
) {
  await deleteDoc(
    doc(db, "packages", id)
  );
}