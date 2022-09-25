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
        name: 'sub-admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    },
  
  async down (queryInterface, Sequelize) {
  }
};
