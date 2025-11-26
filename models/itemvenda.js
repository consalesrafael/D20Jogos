'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemVenda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemVenda.init({
    quantidade: DataTypes.INTEGER,
    precoUnitario: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ItemVenda',
  });
  return ItemVenda;
};