"use client";

import { useEffect, useState } from "react";

import { Parent } from "@/types/parent";
import { Student } from "@/types/student";

import {
  addParent,
  deleteParent,
  getParents,
} from "@/services/parentService";

import { getStudents } from "@/services/studentService";

export default function ParentsPage() {
  const [parents, setParents] =
    useState<Parent[]>([]);

  const [students, setStudents] =
    useState<Student[]>([]);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [studentId, setStudentId] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setParents(await getParents());
    setStudents(await getStudents());
  }

  async function handleAdd() {
    if (!studentId) return;

    const student = students.find(
      (s) => s.id === studentId
    );

    if (!student) return;

    await addParent({
      name,
      email,
      password,
      phone,
      studentId,
      studentName: student.name,
    });

    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setStudentId("");

    loadData();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">
        Veli Yönetimi
      </h1>

      <div className="rounded-xl border bg-white p-6 shadow">
        <div className="grid gap-4 md:grid-cols-2">

          <input
            className="rounded border p-3"
            placeholder="Ad Soyad"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            className="rounded border p-3"
            placeholder="Telefon"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <input
            className="rounded border p-3"
            placeholder="E-Posta"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            className="rounded border p-3"
            placeholder="Şifre"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <select
            className="rounded border p-3"
            value={studentId}
            onChange={(e) =>
              setStudentId(
                e.target.value
              )
            }
          >
            <option value="">
              Öğrenci Seç
            </option>

            {students.map((student) => (
              <option
                key={student.id}
                value={student.id}
              >
                {student.name}
              </option>
            ))}
          </select>

        </div>

        <button
          onClick={handleAdd}
          className="mt-6 rounded bg-blue-600 px-5 py-3 text-white"
        >
          Veli Ekle
        </button>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th>Ad Soyad</th>
              <th>Telefon</th>
              <th>E-Posta</th>
              <th>Öğrenci</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {parents.map((parent) => (
              <tr
                key={parent.id}
                className="border-b"
              >
                <td>{parent.name}</td>
                <td>{parent.phone}</td>
                <td>{parent.email}</td>
                <td>
                  {parent.studentName}
                </td>

                <td>
                  <button
                    onClick={async () => {
                      await deleteParent(
                        parent.id!
                      );

                      loadData();
                    }}
                    className="text-red-600"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}