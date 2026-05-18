const express = require('express');
const fs = require('fs').promises; // Usando a versão de promessas do fs para um código mais limpo
const path = require('path');

const app = express();
const PORT = 3000;
const ARQUIVO_NOTAS = path.join(__dirname, 'notas.json');

app.use(express.json());
app.use(express.static('public'));

// Função auxiliar para ler o arquivo JSON
async function lerNotas() {
    try {
        const data = await fs.readFile(ARQUIVO_NOTAS, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // Se o arquivo não existir ou estiver vazio, retorna um array vazio
        return [];
    }
}

// Função auxiliar para salvar no arquivo JSON
async function salvarNotas(notas) {
    await fs.writeFile(ARQUIVO_NOTAS, JSON.stringify(notas, null, 2), 'utf8');
}

// READ - Buscar todas as notas
app.get('/api/notas', async (req, res) => {
    const notas = await lerNotas();
    res.json(notas);
});

// CREATE - Criar nova nota
app.post('/api/notas', async (req, res) => {
    const { texto } = req.body;
    const notas = await lerNotas();
    
    const novaNota = {
        id: Date.now().toString(), // Cria um ID único baseado no tempo
        texto: texto
    };
    
    notas.push(novaNota);
    await salvarNotas(notas);
    res.status(201).json(novaNota);
});

// UPDATE - Atualizar uma nota existente
app.put('/api/notas/:id', async (req, res) => {
    const { id } = req.params;
    const { texto } = req.body;
    const notas = await lerNotas();
    
    const index = notas.findIndex(n => n.id === id);
    if (index !== -1) {
        notas[index].texto = texto;
        await salvarNotas(notas);
        res.json(notas[index]);
    } else {
        res.status(404).json({ error: 'Nota não encontrada' });
    }
});

// DELETE - Excluir uma nota
app.delete('/api/notas/:id', async (req, res) => {
    const { id } = req.params;
    let notas = await lerNotas();
    
    // Filtra removendo a nota com o ID correspondente
    notas = notas.filter(n => n.id !== id);
    await salvarNotas(notas);
    res.json({ message: 'Nota excluída' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});