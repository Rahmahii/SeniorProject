'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoice_headers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      purchaseDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      storeId: {
        type: Sequelize.INTEGER,  references: { model: 'stores', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: false,
      },
      gatawayId: {
        type: Sequelize.INTEGER,  references: { model: 'payment_gatways', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,  references: { model: 'users', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: false,
      },
      CreditCardHolder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CreditCardNum: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CreditBankName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      depositCardHolder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      depositCardNum: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      depositBankName: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('invoice_headers');
  }
};