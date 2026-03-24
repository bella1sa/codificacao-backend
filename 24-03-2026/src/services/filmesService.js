const filmes = [
    { id: 1, titulo: 'Vingadores', ano: 2012 },
    { id: 2, titulo: 'Homem-Aranha', ano: 2002 },
    { id: 3, titulo: 'Batman', ano: 2022 }
];

// LISTAR TODOS
const getAll = () => {
    return filmes;
};

// BUSCAR POR ID
const getById = (id) => {
    return filmes.find(filme => filme.id === id);
};

module.exports = {
    getAll,
    getById
};