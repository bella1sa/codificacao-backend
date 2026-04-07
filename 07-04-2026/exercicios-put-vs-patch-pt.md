# Exercícios de Prática em API REST — PUT vs PATCH

Estes exercícios usam a API de `fruits` para praticarem a diferença entre `PATCH` e `PUT`.

---

## Contexto inicial da API

A API possui as seguintes rotas:

- `GET /fruits` → lista todas as frutas
- `GET /fruits/:id` → busca uma fruta pelo ID
- `POST /fruits` → cria uma nova fruta
- `PATCH /fruits/:id` → atualiza parcialmente uma fruta
- `PUT /fruits/:id` → substitui completamente uma fruta
- `DELETE /fruits/:id` → remove uma fruta

Dados iniciais do mock:

```json
[
  { "id": 1, "nome": "Maça" },
  { "id": 2, "nome": "Pera" }
]
```

---

# Exercício 1 — Atualização parcial com `PATCH`

## Objetivo

Usar `PATCH` para atualizar apenas um campo de uma fruta existente.

## Cenário

Uma fruta já existe no sistema, e você quer alterar somente o nome dela, sem substituir o objeto inteiro.

## Rota a utilizar

```http
PATCH /fruits/:id
```

## Instruções

1. Encontre a fruta com `id = 1`
2. Altere o `nome` de `"Maça"` para `"Maçã Verde"`
3. Envie apenas o campo que precisa ser atualizado
4. Retorne a fruta atualizada na resposta

## Exemplo de requisição

```http
PATCH /fruits/1
Content-Type: application/json
```

```json
{
  "nome": "Maçã Verde"
}
```

## Resposta esperada

```json
{
  "id": 1,
  "nome": "Maçã Verde"
}
```

## Perguntas para responder em um arquivo .md

- Por que `PATCH` é a melhor escolha nesse caso?
- O que significa atualização parcial?
- O que acontece quando você envia apenas um campo?

## Aprendizado esperado

Ao final deste exercício, voce deve entender que:

- `PATCH` é usado para atualizações parciais
- apenas os campos enviados na requisição são alterados
- o restante do recurso permanece inalterado

---

# Exercício 2 — Substituição completa com `PUT`

## Objetivo

Usar `PUT` para substituir todos os dados de uma fruta existente.

## Cenário

Uma fruta já existe, mas agora você deseja substituir os dados atuais por uma nova versão.

## Rota a utilizar

```http
PUT /fruits/:id
```

## Instruções

1. Encontre a fruta com `id = 2`
2. Substitua os dados dela por um novo nome
3. Envie todos os dados obrigatórios para a substituição
4. Retorne a fruta atualizada na resposta

## Exemplo de requisição

```http
PUT /fruits/2
Content-Type: application/json
```

```json
{
  "nome": "Pera Argentina"
}
```

## Resposta esperada

```json
{
  "id": 2,
  "nome": "Pera Argentina"
}
```

## Perguntas para responder em um arquivo .md

- Por que `PUT` é considerado uma substituição completa?
- Qual é a diferença entre substituir e atualizar parcialmente?
- Se o objeto tivesse mais campos, o que poderia acontecer se eles não fossem enviados?

## Aprendizado esperado

Ao final deste exercício, voce deve entender que:

- `PUT` é usado para substituir toda a representação do recurso
- o cliente deve enviar a nova versão completa do objeto
- em objetos maiores, campos ausentes podem ser perdidos ou sobrescritos, dependendo da implementação

---

# Resumo — Diferença entre `PATCH` e `PUT`

## `PATCH`
Use quando quiser atualizar apenas parte do objeto.

Exemplo:

```json
{
  "nome": "Maçã Verde"
}
```

Significado:  
**"Altere apenas este campo."**

## `PUT`
Use quando quiser substituir o objeto inteiro.

Exemplo:

```json
{
  "nome": "Pera Argentina"
}
```

Significado:  
**"Substitua o objeto atual por esta nova versão."**

---

# Desafio extra

Crie uma nova estrutura de fruta com mais campos para deixar a diferença entre `PATCH` e `PUT` ainda mais clara:

```json
[
  { "id": 1, "nome": "Maça", "cor": "Vermelha", "preco": 5 },
  { "id": 2, "nome": "Pera", "cor": "Verde", "preco": 6 }
]
```

Depois teste:

- `PATCH` para atualizar apenas `preco`
- `PUT` para substituir `nome`, `cor` e `preco`

Exemplo de `PATCH`:

```json
{
  "preco": 7
}
```

Exemplo de `PUT`:

```json
{
  "nome": "Pera Argentina",
  "cor": "Amarela",
  "preco": 8
}
```

Isso deixa a distinção muito mais fácil de entender em APIs do mundo real.
