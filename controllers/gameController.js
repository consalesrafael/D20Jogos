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
    const cart = req.session.cart || [];
    const cartTotal = cart.reduce(
        (sum, item) => sum + item.preco * item.quantidade,
        0
    );

    res.render("homePage",{
        Jogo:req.jogo,
        cart,
        cartTotal
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
    const JogoPararenderizar = await db.Jogo.findByPk(jogoId)

    const cart = req.session.cart || [];
    const cartTotal = cart.reduce(
        (sum, item) => sum + item.preco * item.quantidade,
        0
    );

    return res.render("./pages/buypage",{
        jogo: JogoPararenderizar,
        cart,
        cartTotal
    })
}
async function rederizaPaginaAluguel(req,res) {
    const jogoId = req.params.id
    const JogoPararenderizar = await db.Jogo.findByPk(jogoId)

    return res.render("./pages/rentalPage",{
        jogo: JogoPararenderizar
    })
}

// Carrinho de compras
async function addToCart(req, res) {
    const jogoId = req.params.id;

    try {
        const jogo = await db.Jogo.findByPk(jogoId);

        if (!jogo) {
            console.error("Jogo não encontrado para adicionar ao carrinho");
            return res.redirect("/");
        }

        if (!req.session.cart) {
            req.session.cart = [];
        }

        const existingItemIndex = req.session.cart.findIndex(
            (item) => item.id === jogo.id
        );

        if (existingItemIndex !== -1) {
            req.session.cart[existingItemIndex].quantidade += 1;
        } else {
            req.session.cart.push({
                id: jogo.id,
                nome: jogo.nome,
                preco: Number(jogo.preco),
                quantidade: 1,
                caminho_foto: jogo.caminho_foto
            });
        }

        const total = req.session.cart.reduce(
            (sum, item) => sum + item.preco * item.quantidade,
            0
        );

        const isAjax =
            req.headers["x-requested-with"] === "XMLHttpRequest" ||
            (req.headers.accept && req.headers.accept.includes("application/json"));

        if (isAjax) {
            return res.json({
                cart: req.session.cart,
                total
            });
        }

        res.redirect("/carrinho");
    } catch (error) {
        console.error("Erro ao adicionar jogo ao carrinho:", error);
        res.redirect("/");
    }
}

function renderCart(req, res) {
    const cart = req.session.cart || [];

    const total = cart.reduce(
        (sum, item) => sum + item.preco * item.quantidade,
        0
    );

    res.render("./pages/cart", {
        paginaAtual: "carrinho",
        cart,
        total
    });
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

// Confirmar compra: registrar venda e limpar carrinho
async function confirmarCompra(req, res) {
    const cart = req.session.cart || [];

    if (!cart.length) {
        return res.redirect("/carrinho");
    }

    try {
        const itens_quantidade = cart.reduce(
            (sum, item) => sum + (item.quantidade || 0),
            0
        );

        const total = cart.reduce(
            (sum, item) => sum + item.preco * item.quantidade,
            0
        );

        const clienteNome =
            (req.session && req.session.user && req.session.user.nome) || null;

        await db.Venda.create({
            cliente_nome: clienteNome,
            itens: JSON.stringify(cart),
            total,
            itens_quantidade
        });

        // Limpa o carrinho após a compra
        req.session.cart = [];

        return res.redirect("/"); // redireciona para a home após a compra
    } catch (error) {
        console.error("Erro ao confirmar compra:", error);
        return res.status(500).send("Erro ao confirmar a compra");
    }
}

module.exports = {
    gameRegister,
    redezaProduto,
    renderizaHomePage,
    renderizaEstoquePage,
    renderizaAlugueis,
    deletGame,
    editGame,
    rederizaPaginaCompra,
    rederizaPaginaAluguel,
    addToCart,
    renderCart,
    confirmarCompra
};