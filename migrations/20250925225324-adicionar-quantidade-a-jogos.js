'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Comando para adicionar a nova coluna 'quantidade' à tabela 'Jogos'
    await queryInterface.addColumn('Jogos', 'quantidade', {
      type: Sequelize.INTEGER,
      allowNull: false, // Não permitir que a quantidade seja nula
      defaultValue: 0   // Definir um valor padrão de 0
    });
  },

  async down(queryInterface, Sequelize) {
    // Comando para remover a coluna, caso precisemos reverter a migration
    await queryInterface.removeColumn('Jogos', 'quantidade');
  }
};