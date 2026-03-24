const express = require('express');
const router = express.Router();

const filmesService = require('../services/filmesService');

// GET ALL
router.get('/', (req, res) => {
    const filmes = filmesService.getAll();
    res.json(filmes);
});

// GET BY ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filme = filmesService.getById(id);

    if (!filme) {
        return res.status(404).json({ mensagem: 'Filme não encontrado' });
    }

    res.json(filme);
});

module.exports = router;