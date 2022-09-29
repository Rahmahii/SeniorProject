'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('payment_gatways', [{
      name: "Mada",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "ApplePay",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
