'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('invoice_details', [{
      invoiceHeaderId: 1,
      productId:1,
      quantity:1,
      PurchasingPrice:2.5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      invoiceHeaderId: 1,
      productId:2,
      quantity:1,
      PurchasingPrice:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      invoiceHeaderId: 2,
      productId:1,
      quantity:1,
      PurchasingPrice:500,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      invoiceHeaderId: 2,
      productId:2,
      quantity:1,
      PurchasingPrice:500,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      invoiceHeaderId: 3,
      productId:3,
      quantity:4,
      PurchasingPrice:500,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      invoiceHeaderId: 3,
      productId:4,
      quantity:5,
      PurchasingPrice:500,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      invoiceHeaderId: 3,
      productId:1,
      quantity:1,
      PurchasingPrice:500,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      invoiceHeaderId: 3,
      productId:2,
      quantity:1,
      PurchasingPrice:500,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
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
