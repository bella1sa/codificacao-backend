let fruits = [
  { id: 1, nome: "Maça" },
  { id: 2, nome: "Pera" }
];

// GET ALL
const getAll = () => {
  return fruits;
};

// GET BY ID
const getById = (id) => {
  return fruits.find(f => f.id === id);
};

// CREATE
const create = (nome) => {
  const newFruit = {
    id: fruits.length + 1,
    nome
  };
  fruits.push(newFruit);
  return newFruit;
};

// PATCH (parcial)
const updatePartial = (id, data) => {
  const fruit = fruits.find(f => f.id === id);
  if (!fruit) return null;

  if (data.nome !== undefined) {
    fruit.nome = data.nome;
  }

  return fruit;
};

// PUT (completo)
const updateFull = (id, data) => {
  const index = fruits.findIndex(f => f.id === id);
  if (index === -1) return null;

  fruits[index] = {
    id,
    nome: data.nome
  };

  return fruits[index];
};

// DELETE
const remove = (id) => {
  const index = fruits.findIndex(f => f.id === id);
  if (index === -1) return false;

  fruits.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  updatePartial,
  updateFull,
  remove
};