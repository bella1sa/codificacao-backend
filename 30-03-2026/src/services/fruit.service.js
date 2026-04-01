// Dados unificados para todas operações CRUD
const frutas = [
  { id: 1, nome: "Maçã", preco: 5 },
  { id: 2, nome: "Banana", preco: 3 }
];

class FruitService {
  getAll() {
    return frutas;
  }

  getById(id) {
    return frutas.find(f => f.id === parseInt(id));
  }

  create(nome) {
    const novoId = frutas.length > 0 ? Math.max(...frutas.map(f => f.id)) + 1 : 1;
    const novaFruta = { id: novoId, nome };
    frutas.push(novaFruta);
    return novaFruta;
  }

  atualizarFruta(id, novaFruta) {
    const index = frutas.findIndex(f => f.id === parseInt(id));
    if (index === -1) return null;
    frutas[index] = { id: parseInt(id), ...novaFruta };
    return frutas[index];
  }

  atualizarParcial(id, dados) {
    const fruta = frutas.find(f => f.id === parseInt(id));
    if (!fruta) return null;
    Object.assign(fruta, dados);
    return fruta;
  }

  deletarFruta(id) {
    const index = frutas.findIndex(f => f.id === parseInt(id));
    if (index === -1) return null;
    const removida = frutas.splice(index, 1)[0];
    return removida;
  }
}

export const fruitService = new FruitService();