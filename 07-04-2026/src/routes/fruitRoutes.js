const express = require('express');
const router = express.Router();

const fruitsService = require('../services/fruit.service');

// GET ALL
router.get('/', (req, res) => {
  res.json(fruitsService.getAll());
});

// GET BY ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const fruit = fruitsService.getById(id);

  if (!fruit) {
    return res.status(404).json({ mensagem: "Fruta não encontrada" });
  }

  res.json(fruit);
});

// POST
router.post('/', (req, res) => {
  const { nome } = req.body;
  const newFruit = fruitsService.create(nome);

  res.status(201).json(newFruit);
});

// PATCH
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updated = fruitsService.updatePartial(id, req.body);

  if (!updated) {
    return res.status(404).json({ mensagem: "Fruta não encontrada" });
  }

  res.json(updated);
});

// PUT
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updated = fruitsService.updateFull(id, req.body);

  if (!updated) {
    return res.status(404).json({ mensagem: "Fruta não encontrada" });
  }

  res.json(updated);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const removed = fruitsService.remove(id);

  if (!removed) {
    return res.status(404).json({ mensagem: "Fruta não encontrada" });
  }

  res.json({ mensagem: "Fruta removida com sucesso" });
});

module.exports = router;