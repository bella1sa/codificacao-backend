import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração para ler JSON no corpo das requisições
app.use(express.json());

// Mock de dados (Simulando o Banco de Dados na memória)
let chats = [
  {
    id: "order-101",
    orderStatus: "Em andamento",
    agent: { name: "Mariana Santos", id: "user_agent_1", phone: "(11) 98888-7777" },
    customer: { id: "user_client_1", name: "Ana Souza" },
    messages: [
      { id: 1, sender: "system", text: "Pedido retirado pelo entregador.", timestamp: "20:15" },
      { id: 1, sender: "agent", text: "Olá Ana, estou a caminho do seu endereço!", timestamp: "20:16" },
      { id: 3, sender: "customer", text: "Legal, Mariana! O interfone está com defeito, pode me ligar quando chegar?", timestamp: "20:18" },
      { id: 4, sender: "agent", text: "Claro! Já estou no caminho. Vou te ligar assim que eu chegar na portaria.", timestamp: "20:19" },
      { id: 5, sender: "system", text: "Status atualizado para 'Em andamento'. Atendimento em suporte ativo.", timestamp: "20:20" }
    ]
  },
];

// --- ROTAS DA API ---

// 1. Buscar os detalhes de um chat específico pelo ID do pedido
app.get('/api/chats/:orderId', (req, res) => {
  const chat = chats.find(c => c.id === req.params.orderId);
  if (!chat) {
    return res.status(404).json({ error: "Chat/Pedido não encontrado." });
  }
  res.json(chat);
});

// 2. Enviar uma nova mensagem em um chat
app.post('/api/chats/:orderId/messages', (req, res) => {
  const { orderId } = req.params;
  const { sender, text } = req.body;


  if (!sender || !text) {
    return res.status(400).json({ error: "Os campos 'sender' e 'text' são obrigatórios." });
  }

  const chat = chats.find(c => c.id === orderId);
  if (!chat) {
    return res.status(404).json({ error: "Chat não encontrado." });
  }

  // Gerando um timestamp simples (HH:MM)
  const now = new Date();
  const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newMessage = {
    id: chat.messages.length + 1,
    sender,
    text,
    timestamp
  };

  chat.messages.push(newMessage);
  res.status(201).json(newMessage);
});

// --- SERVIR INTERFACE FRONT-END (OPCIONAL) ---
// Configuração para servir arquivos estáticos de uma pasta 'public'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});