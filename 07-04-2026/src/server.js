const express = require('express');
const app = express();

app.use(express.json());

// importar rotas
const fruitsRoutes = require('./routes/fruitRoutes');

// usar rotas
app.use('/fruits', fruitsRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 🚀');
});
