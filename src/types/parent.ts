export interface Parent {
  id?: string;

  userId?: string;

  studentId: string;

  studentName: string;

  name: string;

  phone: string;

  email: string;

  password: string; // V3: Firebase Authentication'a geçildiğinde kaldırılacak.

  createdAt?: unknown;
}