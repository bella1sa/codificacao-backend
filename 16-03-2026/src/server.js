import express from 'express'

const app = express()
const port = 3000

let alunos = [
   {id: 1, nome: 'João'},
   {id: 2, nome: 'Maria'},
   {id: 3, nome: 'Pedro'}]

   res.json(usuarios)
  

/* */ 
 app.get('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const alunos = alunos.find(a => a.id === id)

if (!alunos) {
  return res.status(404).json({
    sucess: false,
    message: 'Aluno não encontrado'
 })
}
res.json({
  sucess: true,
  data: alunos
})
 
})   


//post - criar novo aluno

app.post('alunos', (req, res) => {
    const { nome, idade } = req.body
    if(!nome || !idade){
        return res.status(400).json({
            sucess: false,
            message: 'Nome e Idade são Obrigatorios'
        })
    }
  
    const novoAluno = {
        id: alunos.length + 1,
        nome,
        idade
    }
    alunos.push(novoAluno)
        res.status(201).json({
            sucess:true,
            message: novoAluno
        })


})
  