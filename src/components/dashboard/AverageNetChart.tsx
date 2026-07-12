"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ChartItem {
  examName: string;
  averageNet: number;
}

interface AverageNetChartProps {
  data: ChartItem[];
}

export default function AverageNetChart({
  data,
}: AverageNetChartProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-semibold">
        📈 Son Denemeler Ortalama Net
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="examName" />

            <YAxis domain={[0, 120]} />

            <Tooltip
  formatter={(value) => [
    Number(value).toFixed(2),
    "Ortalama Net",
  ]}
/>

            <Line
            type="monotone"
            dataKey="averageNet"
            stroke="#2563eb"
            strokeWidth={4}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}