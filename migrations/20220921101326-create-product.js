'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      SellPrice: {
        type: Sequelize.DOUBLE
      },
      barcodeNum: {
        type: Sequelize.BIGINT
      },
      categoryId: {
        type: Sequelize.INTEGER,  references: { model: 'categories', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: true,
      },
      storeId: {
        type: Sequelize.INTEGER,  references: { model: 'stores', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: true,
      },
      currencyId: {
        type: Sequelize.INTEGER,  references: { model: 'currencies', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: true,
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
    await queryInterface.dropTable('products');
  }
};