import fs from "fs/promises";


async function readFruits() {
  const data = await fs.readFile("./fruits.json", "utf-8");
  return JSON.parse(data);
}

async function writeFruits(fruits) {
  const data = JSON.stringify(fruits, null, 2);
  await fs.writeFile("./fruits.json", data, "utf-8");
}


async function resetFruits() {
  const initialData = [
    { id: 1, nome: "Maçã", cor: "Vermelha", preco: 4.5 },
    { id: 2, nome: "Banana", cor: "Amarela", preco: 3.0 },
    { id: 3, nome: "Uva", cor: "Roxa", preco: 6.5 }
  ];
  await writeFruits(initialData);
  console.log(" Arquivo JSON resetado para os dados iniciais.");
}

async function getAllFruits() {
  return await readFruits();
}

async function getFruitById(id) {
  const fruits = await readFruits();
  return fruits.find(item => item.id === Number(id));
}

// Desafio: Permitir buscar frutas pelo nome
async function getFruitByName(nome) {
  const fruits = await readFruits();
  const fruit = fruits.find(item => item.nome.toLowerCase() === nome.toLowerCase());
  
  if (!fruit) {
    console.log(`  Busca: Nenhuma fruta encontrada com o nome '${nome}'.`);
  }
  return fruit;
}

// Desafio: Impedir nomes duplicados e adicionar cor e preco
async function createFruit(nome, cor, preco) {
  const fruits = await readFruits();
  
  // Verifica se já existe 
  const alreadyExists = fruits.some(item => item.nome.toLowerCase() === nome.toLowerCase());
  
  if (alreadyExists) {
    console.log(` Erro no cadastro: A fruta '${nome}' já está cadastrada.`);
    return null;
  }
  
  const newFruit = {
    id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
    nome: nome,
    cor: cor || "Não informada",
    preco: preco || 0.0
  };
  
  fruits.push(newFruit);
  await writeFruits(fruits);
  console.log(`Sucesso: Fruta '${nome}' cadastrada com sucesso!`);
  
  return newFruit;
}

// Desafio
async function updateFruit(id, novoNome, novaCor, novoPreco) {
  const fruits = await readFruits();
  const index = fruits.findIndex(item => item.id === Number(id));
  
  if (index === -1) {
    console.log(` Erro na atualização: Fruta com ID ${id} não encontrada.`);
    return null;
  }
 
  if (novoNome) {
    const nameExists = fruits.some(item => item.nome.toLowerCase() === novoNome.toLowerCase() && item.id !== Number(id));
    if (nameExists) {
      console.log(` Erro na atualização: Já existe outra fruta chamada '${novoNome}'.`);
      return null;
    }
    fruits[index].nome = novoNome;
  }
  
  if (novaCor) fruits[index].cor = novaCor;
  if (novoPreco !== undefined) fruits[index].preco = novoPreco;
  
  await writeFruits(fruits);
  console.log(` Sucesso: Fruta ID ${id} atualizada com sucesso!`);
  
  return fruits[index];
}

// Desafio
async function deleteFruit(id) {
  const fruits = await readFruits();
  const index = fruits.findIndex(item => item.id === Number(id));
  
  if (index === -1) {
    console.log(` Erro na remoção: Fruta com ID ${id} não encontrada.`);
    return false;
  }
  
  const removedName = fruits[index].nome;
  fruits.splice(index, 1);
  await writeFruits(fruits);
  
  console.log(` Sucesso: Fruta '${removedName}' removida do sistema!`);
  return true;
}



async function runTests() {
  console.log("\n--- INICIANDO TESTES DOS DESAFIOS EXTRAS ---\n");

  // 1. Resetar o JSON para garantir que começamos do zero
  await resetFruits();

  // 2. Tentar cadastrar uma fruta que já existe 
  console.log("\n[ Teste: Duplicata ]");
  await createFruit("maçã", "Verde", 5.0);

  // 3. Cadastrar uma fruta nova com campos de cor e preço
  console.log("\n[ Teste: Cadastro com novos campos ]");
  const abacaxi = await createFruit("Abacaxi", "Amarelo", 7.5);
  console.log(abacaxi);

  // 4. Buscar fruta pelo nome
  console.log("\n[ Teste: Buscar pelo nome ]");
  const uva = await getFruitByName("UVA");
  console.log("Resultado da busca:", uva);

  // 5. Buscar fruta que não existe pelo nome
  const kiwi = await getFruitByName("Kiwi");

  // 6. Atualizar a fruta passando cor e preço
  console.log("\n[ Teste: Atualização ]");
  const uvaAtualizada = await updateFruit(3, "Uva Thompson", "Verde", 9.0);
  console.log("Antes era Uva Roxa. Agora:", uvaAtualizada);

  // 7. Remover uma fruta
  console.log("\n[ Teste: Remoção ]");
  await deleteFruit(2); // Remove a Banana

  // 8. Tentar remover uma fruta que não existe
  await deleteFruit(99);

  // 9. Mostrar a lista final
  console.log("\n[ Teste: Lista Final ]");
  const listaFinal = await getAllFruits();
  console.log(listaFinal);
}

// Executa os testes
runTests();