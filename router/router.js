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


router.get("/pages/buyPage",(req, res)=>{
    res.render("./pages/buyPage")
});
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
router.get('/api/jogos/:id', gameController.getJogoData)
router.post("/admin/add-game",upload.single('gameImage'),gameController.gameRegister)
router.get("/gerenciaEstoque",gameController.redezaProduto, gameController.renderizaEstoquePage)
router.get("/alugueis", gameController.redezaProduto,gameController.renderizaAlugueis)
router.post("/jogos/deletar/:id",gameController.deletGame)
router.get("/", gameController.redezaProduto, gameController.renderizaHomePage)

module.exports=router;