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
      description:"330 ML",
      image:"products\\1665003555022pepsi.png",
      createdAt: new Date(),
      updatedAt: new Date()
    },
   { name: 'Almarai juice',
    price: 1.5,
    sellPrice: 1.5,
    barcodeNum: 6281007054997,
    storeId: 1,
    categoryId:2,
    currencyId:1,
    description:"Almarai juice 180 ml",
    image:"products\\orange.png",
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
      name: 'Layes',
      price: 8,
      sellPrice: 8,
      barcodeNum: 6009510806151,
      storeId: 1,
      categoryId:1,
      currencyId:1,
      description:"Multi flavor 105 g",
      image:"products\\1665007682855Lays.png",
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
      description:"For math",
      image:"products\\1665008483099calculusjpg.png",
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
      description:"Multicolor from Roco",
      image:"products\\1665008589084pen.png",
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
