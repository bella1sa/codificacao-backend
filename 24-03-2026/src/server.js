const express = require('express');
const app = express();

app.use(express.json());

// IMPORTAR ROTAS 
const filmesRoutes = require('./routes/filmesRoutes');

// USAR ROTAS
app.use('/filmes', filmesRoutes);

// TESTE
app.get('/', (req, res) => {
    res.send('API de filmes funcionando');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});  