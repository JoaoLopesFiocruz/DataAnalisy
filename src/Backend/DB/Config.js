require('dotenv').config();
const { Pool } = require('pg');

// Configuração do banco de dados PostgreSQL
// Utiliza variáveis de ambiente do arquivo .env
const pool = new Pool({
  user: process.env.DATABASEUSER,
  host: process.env.DATABASEHOST,
  database: process.env.DATABASENAME,
  password: process.env.DATABASEPASSWORD,
  port: Number(process.env.DATABASEPORT)
});

// Teste de conexão
pool.on('connect', () => {
  console.log('Conectado ao banco PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Erro na conexão com PostgreSQL:', err);
});

module.exports = pool;