import { addUser } from "@/services/userService";
import { addParent } from "@/services/parentService";
import { createStudent } from "@/services/studentService";

import { Student } from "@/types/student";
import { Parent } from "@/types/parent";
import { User } from "@/types/user";

interface RegisterStudentPayload {
  student: Student;
  parent: Parent;
  studentUser: User;
  parentUser: User;
}

function generateId() {
  return crypto.randomUUID();
}

export async function registerStudent(
  payload: RegisterStudentPayload
) {
  // Ortak UID'leri biz üretelim
  const studentUserId = generateId();
  const parentUserId = generateId();
  const parentId = generateId();

  // Users
  await addUser(studentUserId, payload.studentUser);

  await addUser(parentUserId, payload.parentUser);

  // Parent
  await addParent({
    ...payload.parent,
    id: parentId,
    userId: parentUserId,
  });

  // Student
  await createStudent({
  student: {
    ...payload.student,
    userId: studentUserId,
    parentId,
  },

  parentId,

  userId: studentUserId,

  coachId: payload.student.coachId,

  packageId: payload.student.packageId,
});
}