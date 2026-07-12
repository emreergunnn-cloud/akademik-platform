export type UserRole =
  | "superadmin"
  | "admin"
  | "secretary"
  | "coach"
  | "parent"
  | "student";

export interface User {
  id?: string;

  name: string;

  email: string;

  role: UserRole;

  institutionId?: string;

  createdAt?: unknown;
}