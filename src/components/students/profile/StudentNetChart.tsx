"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Exam } from "@/types/exam";

interface StudentNetChartProps {
  exams: Exam[];
}

export default function StudentNetChart({
  exams,
}: StudentNetChartProps) {
  const data = [...exams]
    .reverse()
    .map((exam) => ({
      name: exam.examName,
      net: exam.totalNet,
    }));

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Net Gelişim Grafiği
      </h2>

      {data.length === 0 ? (
        <p className="text-slate-500">
          Grafik oluşturmak için en az bir deneme gerekli.
        </p>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="net"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}