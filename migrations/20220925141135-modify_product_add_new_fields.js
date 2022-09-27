'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [{
      name: 'Pipsi',
      price: 2.5,
      sellPrice: 2.5,
      barcodeNum: 6164001011534,
      storeId: 1,
      categoryId:2,
      currencyId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Layes',
      price: 2,
      sellPrice: 2,
      barcodeNum: 6009510806151,
      storeId: 1,
      categoryId:1,
      currencyId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'calculus',
      price: 500,
      sellPrice: 500,
      barcodeNum: 6009188002213,
      storeId: 2,
      categoryId:3,
      currencyId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Pen',
      price: 1,
      sellPrice: 1,
      barcodeNum: 8904106838586,
      storeId: 2,
      categoryId:3,
      currencyId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
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
