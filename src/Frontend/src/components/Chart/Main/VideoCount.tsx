import { PieChart, Pie, ResponsiveContainer,Cell,Label,Tooltip,Sector  } from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";



export default function SubjectChart() {
  const [data, setData] = useState<unknown>([]);

  const api = axios.create({
    baseURL: "http://localhost:3000/data/data",
  });
    


  useEffect(() => {
    api.get("/").then(async (response) => {
      const formatted=
        Object.entries(response.data.data).map(
          ([key, value]) => ({
            Language: key,
            count: value,
          })
        );
        
      setData(formatted);
    });
  }, []);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const COLORS = [
    "#3b82f6",
    "#4f46e5",
    "#60a5fa",
    "#3b82f6",
    "#2563eb",
    "#1d4ed8",
    "#1e40af",
    "#4f46e5",
    "#4338ca",
    "#3730a3",
    "#312e81" 
];
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 50, right: 20, left: 20, bottom: 0 }}>
                <Tooltip />
                <Label 
                    value="Number of videos by language"
                    position="top"
                    offset={20}
                    style={{
                        fill: "#e5e7eb",
                        fontSize: 16,
                        fontWeight: 600
                    }}
                />
                <Pie
                    isAnimationActive={false}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    stroke="none"
                    data={data}
                    dataKey="count"
                    nameKey="Language"
                    innerRadius="60%"
                    outerRadius="95%"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
                    const RADIAN = Math.PI / 180;

                    // 🔹 posição do valor (dentro)
                    const insideRadius =
                        innerRadius + (outerRadius - innerRadius) / 2;

                    const xInside =
                        cx + insideRadius * Math.cos(-midAngle * RADIAN);
                    const yInside =
                        cy + insideRadius * Math.sin(-midAngle * RADIAN);

                    // 🔹 posição do nome (fora)
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
                    {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        style={{
                            cursor: "pointer",
                            opacity:
                                activeIndex === null || activeIndex === index ? 1 : 0.5,
                            transition: "opacity 0.5s ease"
                        }}
                    />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}