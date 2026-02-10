import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,Label } from "recharts";

export default function Grafico() {
  const [data, setdata] = useState([
  { label: "Saúde Indígena", count: 120 },
  { label: "Educação", count: 80 },
  { label: "Meio Ambiente", count: 45 },
  { label: "Cultura", count: 60 }
]);
  const api = axios.create({
      baseURL: "http://localhost:3000/data/Authors",
  });
  useEffect(()=>{
    api.put("/",{
	    "size":5
    }).then((response)=>{
      setdata(response.data.data)
    }).catch(()=>{

    })
  },[])
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
  data={data}
  margin={{ top: 50, right: 20, left: 0, bottom: 0 }}
>
  <Label
    value="Number of publications of the most important authors"
    position="top"
    style={{
      fill: "#e5e7eb",
      fontSize: 16,
      fontWeight: 600
    }}
  />

  <XAxis
    dataKey="label"
    stroke="#e5e7eb"
    tick={{ fill: "#e5e7eb", fontSize: 12 }}
  />

  <YAxis
    domain={[0, "dataMax"]}
    stroke="#e5e7eb"
    tick={{ fill: "#e5e7eb", fontSize: 12 }}
  />

  <Tooltip />
  <Bar dataKey="count" fill="#4f46e5" />
</BarChart>

      
    </ResponsiveContainer>
  );
}
