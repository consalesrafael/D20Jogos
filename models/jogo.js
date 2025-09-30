'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jogo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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