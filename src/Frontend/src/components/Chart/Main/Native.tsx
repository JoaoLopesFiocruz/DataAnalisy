import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Label,
  Tooltip
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";

type DataType = {
  label: string;
  count: number;
};

export default function Grafico() {
  const [data, setData] = useState<DataType[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const api = axios.create({
    baseURL: "http://localhost:3000/data/authors/native",
  });

  useEffect(() => {
    api.get("/").then((response) => {
      const { Native, NotNative } = response.data.data;

      const formatted = [
        { label: "Native", count: Native },
        { label: "Not Native", count: NotNative },
      ];

      setData(formatted);
    });
  }, []);

  const COLORS = ["#4f46e5", "#3b82f6"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 50, right: 20, left: 20, bottom: 0 }}>
        <Tooltip />

        <Label
          value="Number of publications by author origin"
          position="top"
          offset={20}
          style={{
            fill: "#e5e7eb",
            fontSize: 16,
            fontWeight: 600,
          }}
        />

        <Pie
          isAnimationActive={false}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          startAngle={90}
  endAngle={-270}
          onMouseLeave={() => setActiveIndex(null)}
          stroke="none"
          data={data}
          dataKey="count"
          nameKey="label"
          innerRadius="60%"
          outerRadius="95%"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
            const RADIAN = Math.PI / 180;

            // 🔹 valor dentro
            const insideRadius =
              innerRadius + (outerRadius - innerRadius) / 2;

            const xInside =
              cx + insideRadius * Math.cos(-midAngle * RADIAN);
            const yInside =
              cy + insideRadius * Math.sin(-midAngle * RADIAN);

            // 🔹 nome fora
            const outsideRadius = outerRadius + 50;

            const xOutside =
              cx + outsideRadius * Math.cos(-midAngle * RADIAN);
            const yOutside =
              cy + outsideRadius * Math.sin(-midAngle * RADIAN);

            return (
              <>
                <text
                  x={xInside}
                  y={yInside}
                  fill="#ffffff"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={14}
                  fontWeight="bold"
                >
                  {value}
                </text>

                <text
                  x={xOutside}
                  y={yOutside}
                  fill="#e5e7eb"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={14}
                >
                  {name}
                </text>
              </>
            );
          }}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              style={{
                cursor: "pointer",
                opacity:
                  activeIndex === null || activeIndex === index ? 1 : 0.5,
                transition: "opacity 0.5s ease",
              }}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}