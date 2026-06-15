import express from 'express'
import path from 'path'
import { text } from 'stream/consumers'
import { fileURLToPath } from 'url'

const app = express()
const PORT =process.env.PORT ||3000

// configuração para ler json no corpo das requisições

let chats =[
    {
        id:"order-101",
        orderStatus:"A caminho",
        driver:{name:"Carlos Billagran", phone: "(11)00000-00000"},
        customer:{name:"Ana Souza"},
        messages:[
            {
                id:1,serder:"system",text:"Pedido em processo...",timestamp:"20:00"
            },{
                id:2,serder:"driver",text:"ok...",timestamp:"20:08"
            },
        ]
    }
];
//--------ROTAS DA API----------//

//listar todos os chats/pedidos atvos 
app.get('/api/chats/:orderId',(req,res)=>{
    res.json(chats);//todos
    const chat = chats.find(c=>c.id === req.params.orderId);// especifico
});  

//buscar os detalhes de um chat/pedido específico
app.get('/api/chats/:orderId',(req,res)=>{
    const chat = chats.find(c=>c.id === req.params.orderId);})
    if(!chat){
        return res.status(404).json({error:"Chat não encontrado"});
    }res.json(chat);

//enviar uma mensagem nova
app.post('/api/chats/:orderId/messages',(req,res)=>{
    const chat = chats.find(c=>c.id === req.params.orderId);                
    const{orderId} = req.params;
    const{sender,text} = req.body;})
    if(!sender || !text){
        return res.status(404).json({error:"os campos sender e text são obrigatórios"});
    }
    const chat = chats.find(c=>c.id === orderId);
    if(!chat){
        return res.status(404).json({error:"Chat não encontrado"});
    
    }
    
//gerando um timestamp simples
    const now  = new Date();
   const timestamp = `${String(now.getDate.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const newMessage ={
    id:chat.messages.length +1,
    sender, 
    text,
    timestamp
  };
 const_filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,'public')));
    app.listen(PORT,()=>{
        console.log(`Servidor rodando na porta em :http://localhost:${PORT}`);
    });