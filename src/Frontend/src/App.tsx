import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const dados = [
  { nome: 'Jan', vendas: 400 },
  { nome: 'Fev', vendas: 300 },
  { nome: 'Mar', vendas: 200 },
  { nome: 'Abr', vendas: 278 },
  { nome: 'Mai', vendas: 189 },
];

export default function App() {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dados}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="vendas" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
