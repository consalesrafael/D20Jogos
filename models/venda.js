'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Venda extends Model {
    static associate(models) {
      // associations can be defined here in the future
    }
  }

  Venda.init({
    cliente_nome: DataTypes.STRING,
    itens: DataTypes.TEXT, // JSON com itens do carrinho
    total: DataTypes.DECIMAL,
    itens_quantidade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Venda',
    tableName: 'vendas'
  });

  return Venda;
};


