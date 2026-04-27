import fs from "fs/promises";

// ler o arquivo
async function readFruits() {
  const data = await fs.readFile("./fruits.json", "utf-8");
  return JSON.parse(data);
}

// salvar no arquivo
async function writeFruits(fruits) {
  const data = JSON.stringify(fruits, null, 2);
  await fs.writeFile("./fruits.json", data, "utf-8");
}

// listar todas
async function getAllFruits() {
  return await readFruits();
}

// buscar por id
async function getFruitById(id) {
  const fruits = await readFruits();
  return fruits.find(item => item.id === Number(id));
}

// criar nova fruta
async function createFruit(nome) {
  const fruits = await readFruits();

  const newFruit = {
    id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
    nome: nome
  };

  fruits.push(newFruit);
  await writeFruits(fruits);

  return newFruit;
}

// atualizar fruta
async function updateFruit(id, novoNome) {
  const fruits = await readFruits();

  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) return null;

  fruits[index].nome = novoNome;
  await writeFruits(fruits);

  return fruits[index];
}

// deletar fruta
async function deleteFruit(id) {
  const fruits = await readFruits();

  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) return false;

  fruits.splice(index, 1);
  await writeFruits(fruits);

  return true;
}

// TESTES (pode deixar assim)
const all = await getAllFruits();
console.log("Todas:", all);

const one = await getFruitById(1);
console.log("Por ID:", one);

const created = await createFruit("Abacaxi");
console.log("Criada:", created);

const updated = await updateFruit(1, "Maçã Verde");
console.log("Atualizada:", updated);

const deleted = await deleteFruit(2);
console.log("Deletada?", deleted);

const final = await getAllFruits();
console.log("Final:", final);