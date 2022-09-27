'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,  references: { model: 'users', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: false,
      },
      cardHolderName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cardNum: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CVV: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      expiresDate: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('payment_cards');
  }
};