'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('invoice_details', [{
      invoiceId: 1,
      productId:1,
      quantity:1,
      PurchasingPrice:2.5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      invoiceId: 1,
      productId:2,
      quantity:1,
      PurchasingPrice:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      invoiceId: 2,
      productId:3,
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
