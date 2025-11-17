const express = require("express");
const router = express.Router();
// const loginController = require("../controller/loginController")
 const userController = require("../controllers/userController")
// const authMiddleware = require("../middlewares/authMiddleware")
 const gameController = require("../controllers/gameController");
// const relatorioController = require("../controller/relatorioCrotoller")
const path = require("path");
const multer = require("multer");
const jogo = require("../models/jogo");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/')
    },
    filename:function (req,file,cb){
        cb(null, Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });


router.get("/buyPage/:id", async (req, res) => {
    const jogoId = req.params.id;

    try {
        const jogo = await findJogoById(jogoId); 

        if (!jogo) {
         
            return res.status(404).render("./pages/404", { message: "Jogo não encontrado." });
        }

       
        res.render("./pages/buyPage", { jogo: jogo }); 

    } catch (error) {
        console.error("Erro na rota /buyPage/:id:", error);
        
        res.status(500).render("./pages/500", { message: "Erro interno ao processar sua solicitação." });
    }
})
router.get("/admin/dashboard",(req,res)=>{
    res.render("./pages/admin/dashboard",{
       paginaAtual: 'dashboard'
    })
  })

  router.get('/vendas', (req, res) => {
    res.render('./pages/admin/vendas', { 
        paginaAtual: 'vendas'
    });
  });
  router.get('/relatorios', (req, res) => {
    res.render('./pages/admin/relatorios', { 
        paginaAtual: 'relatorios'
    });
  });

router.post("/register",userController.register)

router.post("/jogos/editar/:id",upload.single('gameImage'),gameController.editGame)
router.post("/admin/add-game",upload.single('gameImage'),gameController.gameRegister)
router.get("/gerenciaEstoque",gameController.redezaProduto, gameController.renderizaEstoquePage)
router.get("/alugueis", gameController.redezaProduto,gameController.renderizaAlugueis)
router.post("/jogos/deletar/:id",gameController.deletGame)

router.get("/", gameController.redezaProduto, gameController.renderizaHomePage)

module.exports=router;