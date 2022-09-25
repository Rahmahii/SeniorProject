'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [{
      name: 'Foods',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Drinks',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Stationery',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
