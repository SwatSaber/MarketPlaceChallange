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
    await queryInterface.renameTable('users', 'Users');
    await queryInterface.renameTable('items', 'Items');
    await queryInterface.renameTable('orders', 'Orders');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameTable('users', 'Users');
    await queryInterface.renameTable('items', 'Items');
    await queryInterface.renameTable('orders', 'Orders');
  }
};
