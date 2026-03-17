const express = require('express');

const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// Rota teste
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// Subir servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});