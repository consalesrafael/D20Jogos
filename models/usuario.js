'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Usuario extends Model {
    
    static associate(models) {
      
    }
  }
  
  Usuario.init({

    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    role: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios' 
  });

  return Usuario;
};