import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,Label
} from "recharts";
import axios from "axios";
import { useEffect,useState } from "react";
export default function SubjectChart() {
    const [data, setdata] = useState([
        { name: "Saúde Indígena", value: 120 },
        { name: "Educação", value: 80 },
        { name: "Meio Ambiente", value: 45 },
        { name: "Cultura", value: 60 }
    ]);
    const api = axios.create({
      baseURL: "http://localhost:3000/data/Subjects",
    });
    useEffect(()=>{
        api.get("/",{
        }).then((response)=>{
            setdata(response.data.data.reverse())
        }).catch((response)=>{
            console.log(response)
        })
    },[])
    return (

        <ResponsiveContainer  width="100%" height="100%" >
            <BarChart margin={{ top: 50, right: 20, left: 20, bottom: 0 }}
            data={data}
            layout="vertical"
            >
                <Label
                    value="Number of publications by subject"
                    position="top"
                    style={{
                      fill: "#e5e7eb",
                      fontSize: 16,
                      fontWeight: 600
                    }}
                  />
            <XAxis type="number" />
            <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#e5e7eb00", fontSize: 12 }}
            />
            <Tooltip />

            <Bar dataKey="value" radius={[0, 10, 10, 0]}
            fill= "#4f46e5">
                <LabelList
                dataKey="value"
                position="right"
                formatter={(value) => value?.toLocaleString("pt-BR")}
                />
                <LabelList
                dataKey="name"
                position="insideRight"
                formatter={(value) => value?.toLocaleString("pt-BR")}
                fill="#fff"
                fontSize={8}
                />
            </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}