import axios from "axios";
import { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { assunto: "Saúde Indígena", quantidade: 120 },
  { assunto: "Educação", quantidade: 80 },
  { assunto: "Meio Ambiente", quantidade: 45 },
  { assunto: "Cultura", quantidade: 60 }
];

export default function Grafico() {
  const api = axios.create({
      baseURL: "http://localhost:3000/data/Authors",
  });
  useEffect(()=>{
    api.put("/",{
	    "size":5
    }).then((response)=>{
      console.log(response.data.data.map(()=>{}))
    }).catch(()=>{

    })
  })
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="assunto" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantidade" />
      </BarChart>
    </ResponsiveContainer>
  );
}
