'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Jogos', 'categoria', {
      type: Sequelize.STRING,
      allowNull: false, 
      defaultValue: 'Geral' // Valor padrão para evitar erros em jogos que já existem
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Jogos', 'categoria');
  }
};