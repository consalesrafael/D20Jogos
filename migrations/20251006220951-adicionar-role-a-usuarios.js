'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    // A função 'down' é executada se precisarmos reverter a migration.
    // Ela remove a coluna 'role' da tabela 'Usuarios'.
    await queryInterface.removeColumn('Usuarios', 'role');
  }
};
