const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
//const router = require("./routes/router");
const cookieParser = require("cookie-parser");
//const { db } = require("./model/index");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("homePage");
  });
app.get("/pages/buyPage", (req,res)=>{
  res.render("pages/buyPage")
})
app.get("/admin/dashboard",(req,res)=>{
  res.render("pages/admin/dashboard",{
     paginaAtual: 'dashboard'
  })
})
app.get('/alugueis', (req, res) => {
  res.render('pages/admin/alugueis', { // ajuste o caminho aqui
      paginaAtual: 'alugueis'
  });
});
app.get('/vendas', (req, res) => {
  res.render('pages/admin/vendas', { // ajuste o caminho aqui
      paginaAtual: 'vendas'
  });
});
app.get('/relatorios', (req, res) => {
  res.render('pages/admin/relatorios', { // ajuste o caminho aqui
      paginaAtual: 'relatorios'
  });
});
app.get("/gerenciaEstoque",(req,res)=>{
  res.render("pages/admin/estoque",{
    paginaAtual: 'estoque'
  })
})

// db.sync().then(() => {
//  }); 
    app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
  });
