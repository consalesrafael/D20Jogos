'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jogo extends Model {
    static associate(models) {
    }
  }
  Jogo.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    preco: DataTypes.DECIMAL,
    caminho_foto: DataTypes.STRING,
    quantidade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jogo',
    tableName:"jogos"
  });
  return Jogo;
};