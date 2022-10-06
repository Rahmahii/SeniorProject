'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoice_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoiceHeaderId: {
        type: Sequelize.INTEGER,  references: { model: 'invoice_headers', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER, references: { model: 'products', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      PurchasingPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invoice_details');
  }
};