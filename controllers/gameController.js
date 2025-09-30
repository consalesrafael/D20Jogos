const db = require("../models");

async function gameRegister(req, res) {
    const gameName = req.body.gameName;
    const gameCategory = req.body.gameCategory;
    const gameStock = req.body.gameStock;
    const gamePrice = req.body.gamePrice;

    const caminhoFoto = req.file ? '/uploads/' + req.file.filename : '/imgs/default-game-image.png';

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
            caminho_foto: caminhoFoto
        });

        res.redirect("/gerenciaEstoque");

    } catch (error) {
        console.error("Erro ao registrar jogo:", error);
        res.redirect('/gerenciaEstoque');
    }
}

module.exports = {
    gameRegister
};