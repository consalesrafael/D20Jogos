const express = require("express");
const router = express.Router();
// const loginController = require("../controller/loginController")
// const userController = require("../controller/userController")
// const authMiddleware = require("../middlewares/authMiddleware")
// const productController = require("../controller/productController");
// const relatorioController = require("../controller/relatorioCrotoller")
const path = require("path");
const multer = require("multer")

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
  router.get('/alugueis', (req, res) => {
    res.render('./pages/admin/alugueis', { 
        paginaAtual: 'alugueis'
    });
  });
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
  router.get("/gerenciaEstoque",(req,res)=>{
    res.render("./pages/admin/estoque",{
      paginaAtual: 'estoque'
    })
  })
router.po
// router.get("/gerenciarProdutos",authMiddleware.verificaJWT, productController.renderizaProduto)
// router.get("/relatorios", authMiddleware.verificaJWT, relatorioController.exibirRelatorios)
// router.post("/logout",loginController.logout)
// router.post('/createProduct', upload.single('imagem'),authMiddleware.verificaJWT, productController.criaProduto);
// router.post('/produtos/editar/:id', upload.single('imagem'),authMiddleware.verificaJWT, productController.editarProduto);
// router.post("/createUser", userController.createUser)
// router.post("/produtos/deletar/:id", authMiddleware.verificaJWT, productController.deletaProduto)
// router.post("/p/:id",authMiddleware.verificaJWT, productController.avaliaProduto)
// router.post("/login", loginController.login)

router.get("/",(req,res)=>{
    res.render('homePage')
})

module.exports=router;