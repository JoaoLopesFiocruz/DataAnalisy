import express from "express";
import testRouter from "./routes/Index";

const app = express();

app.use(express.json());

// Usando o router em um endpoint base
app.use("/", testRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});