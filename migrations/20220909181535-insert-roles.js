'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('roles', [{
        name: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'store-admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    },
  
  async down (queryInterface, Sequelize) {
  }
};
