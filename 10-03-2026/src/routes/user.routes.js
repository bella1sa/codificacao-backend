const router = express.router();
router.get('/', (req, res) => {
    res.json({mensagem: "API funcionando!"});
});

router.get('/usuarios', (req, res) => {
    const usuarios = [
        {id: 1, nome: "ana"}, 
        {id: 2, nome: "bruno"},
      
      ]
    res.json(usuarios);

    }
  );
 
  module.exports = router