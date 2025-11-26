const db = require("../models");

async function listarVendas(req, res) {
  try {
    const vendas = await db.Venda.findAll({
      order: [["createdAt", "DESC"]],
      raw: true
    });

    const vendasProcessadas = vendas.map((venda) => {
      let itens = [];
      try {
        itens = venda.itens ? JSON.parse(venda.itens) : [];
      } catch (e) {
        itens = [];
      }

      const itensCount = itens.reduce(
        (sum, item) => sum + (item.quantidade || 0),
        0
      );

      return {
        ...venda,
        itensCount,
        dataFormatada: venda.createdAt
          ? new Date(venda.createdAt).toLocaleDateString("pt-BR")
          : "",
        totalFormatado: Number(venda.total || 0).toFixed(2)
      };
    });

    res.render("./pages/admin/vendas", {
      paginaAtual: "vendas",
      vendas: vendasProcessadas
    });
  } catch (error) {
    console.error("Erro ao listar vendas:", error);
    res.status(500).send("Erro ao carregar as vendas");
  }
}

async function detalhesVenda(req, res) {
  const id = req.params.id;

  try {
    const venda = await db.Venda.findByPk(id);

    if (!venda) {
      return res.status(404).json({ mensagem: "Venda não encontrada" });
    }

    let itens = [];
    try {
      itens = venda.itens ? JSON.parse(venda.itens) : [];
    } catch (e) {
      itens = [];
    }

    return res.json({
      id: venda.id,
      cliente_nome: venda.cliente_nome || "Cliente não informado",
      data: venda.createdAt
        ? new Date(venda.createdAt).toLocaleString("pt-BR")
        : "",
      total: Number(venda.total || 0),
      itens
    });
  } catch (error) {
    console.error("Erro ao buscar detalhes da venda:", error);
    return res.status(500).json({ mensagem: "Erro ao buscar detalhes da venda" });
  }
}

async function deletarVenda(req, res) {
  const id = req.params.id;

  try {
    await db.Venda.destroy({ where: { id } });

    const isAjax =
      req.headers["x-requested-with"] === "XMLHttpRequest" ||
      (req.headers.accept && req.headers.accept.includes("application/json"));

    if (isAjax) {
      return res.json({ sucesso: true });
    }

    return res.redirect("/vendas");
  } catch (error) {
    console.error("Erro ao deletar venda:", error);
    return res.status(500).json({ mensagem: "Erro ao deletar venda" });
  }
}

module.exports = {
  listarVendas,
  detalhesVenda,
  deletarVenda
};


