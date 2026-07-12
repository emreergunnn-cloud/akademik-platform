export interface Coach {
  id?: string;

  userId?: string;

  name: string;

  phone: string;

  email: string;

  password: string; // V3: Firebase Authentication'a geçildiğinde kaldırılacak.

  createdAt?: unknown;
}