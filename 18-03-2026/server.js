import express from 'express';
import fruitsRoutes from './src/routes/fruitRoutes.js';

const app = express();
const port = 3000;

app.get("/fruits", fruitsRoutes); 

app.listen(port, () => {
    console.log(`Servidor rodando na porta: http://localhost:${port}`);
});