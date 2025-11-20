const db = require("../models");

async function gameRegister(req, res) {
    const gameName = req.body.gameName;
    const gameCategory = req.body.gameCategory;
    const gameStock = req.body.gameStock;
    const gamePrice = req.body.gamePrice;
    const gameDesc = req.body.gameDesc

    const caminhoFoto = req.file ? '/uploads/' + req.file.filename : '/imgs/LogoD20.png';

    if (!gameName || !gameCategory || !gameStock || !gamePrice) {
        console.error("Erro: Campos obrigatórios não preenchidos.");
        return res.redirect('/gerenciaEstoque');
    }

    try {
        const existe = await db.Jogo.findOne({ where: { nome: gameName } });

        if (existe) {
            console.error("Erro: Jogo já cadastrado.");
            return res.redirect('/gerenciaEstoque');
        }

        await db.Jogo.create({
            nome: gameName,
            descricao: gameCategory,
            preco: gamePrice,
            quantidade: gameStock,
            caminho_foto: caminhoFoto,
            categoria: gameDesc
        });

        res.redirect("/gerenciaEstoque");

    } catch (error) {
        console.error("Erro ao registrar jogo:", error);
        res.redirect('/gerenciaEstoque');
    }
}
async function redezaProduto(req,res,next) {
    try{
        const games = await db.Jogo.findAll({raw:true, order:[["nome","ASC"]]})
        req.jogo=games
        
        next();
    }catch(error){
        console.error("Erro ao exibir catalogo de jogos",error)
        res.status(500).send("Erro interno no servidor", error)
    }
}
async function renderizaHomePage(req, res) {
       res.render("homePage",{
            Jogo:req.jogo
        })
}
async function renderizaEstoquePage(req,res) {
    res.render("pages/admin/estoque",{
        paginaAtual: "estoque",
        Jogo: req.jogo
    })
}
async function renderizaAlugueis(req,res) {
    res.render('./pages/admin/alugueis', { 
        paginaAtual: 'alugueis',
        Jogo: req.jogo
 });
}
async function deletGame(req,res) {
    const jogoId = req.params.id

    if (jogoId){
        try{
            await db.Jogo.destroy({where:{id:jogoId}})
            res.redirect("/gerenciaEstoque")
        }catch(erro){
            console.log(erro)
        }
    }
}
async function rederizaPaginaCompra(req,res) {
    const jogoId = req.params.id
    const JogoParaEditar = await db.Jogo.findByPk(jogoId)

    return res.render("./pages/buypage",{
        jogo: JogoParaEditar
    })
}
async function editGame(req,res) {
    const gameId = req.params.id
    const JogoParaEditar = await db.Jogo.findByPk(gameId)
    const gameName = req.body.gameName;
    const gameCategory = req.body.gameCategory;
    const gameStock = req.body.gameStock;
    const gamePrice = req.body.gamePrice;

    if(!JogoParaEditar){
        return res.status(404).json({mensagem:"Jogo não econtrado"})
    }
    const dadosParaAtualizar = {}

    if(gameName != null && gameName !== ''){
        dadosParaAtualizar.nome = gameName
    }
    if(gameCategory != null){
        dadosParaAtualizar.descricao = gameCategory
    }
    if(gameStock !=null && gameStock !== ''){
        dadosParaAtualizar.gameStock = gameStock
    }
    if(gamePrice !=null && gamePrice !== ''){
        dadosParaAtualizar.gamePrice = gamePrice
    }

    if (req.file) {
        dadosParaAtualizar.caminho_foto = '/uploads/' + req.file.filename;
    }
    await JogoParaEditar.update(dadosParaAtualizar)
    return res.redirect('/gerenciaEstoque')
}

module.exports = {
    gameRegister,
    redezaProduto,
    renderizaHomePage,
    renderizaEstoquePage,
    renderizaAlugueis,
    deletGame,
    editGame,
    rederizaPaginaCompra
};