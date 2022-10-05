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
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      sellPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      barcodeNum: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,  references: { model: 'categories', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: true,
      },
      storeId: {
        type: Sequelize.INTEGER,  references: { model: 'stores', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: false,
      },
      currencyId: {
        type: Sequelize.INTEGER,  references: { model: 'currencies', key: 'id' }, onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('products');
  }
};