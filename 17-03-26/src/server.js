import express from 'express';
const app = express();
app.use(express.json());


//dados mocados
const frutas = [
  { id: 1, nome: "Maçã", preco: 3.5 },
  { id: 2, nome: "Banana", preco: 2.0 },
  { id: 3, nome: "Laranja", preco: 4.0 },
  { id: 4, nome: "Uva", preco: 6.5 }
];

//GET ALL
app.get('/frutas', (req, res) => {
  res.json(frutas);
});

//GET BY ID
app.get('/frutas/:id', (req, res) => {
  const id = parseInt(req.params.id);


  const fruta = frutas.find(f => f.id === id);


  if (!fruta) {
    return res.status(404).json({ mensagem: "Fruta não encontrada" });
  }


  res.json(fruta);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
