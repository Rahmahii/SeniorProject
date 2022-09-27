'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('integerates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      storeId: {
        type: Sequelize.INTEGER,  references: { model: 'stores', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: false,
      },
      gatawayId: {
        type: Sequelize.INTEGER,  references: { model: 'payment_gatways', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: false,
      },
      accountNum: {
        type: Sequelize.STRING
      },
      accountName: {
        type: Sequelize.STRING
      },
      bankName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
    });
    await queryInterface.addConstraint('integerates', {
      fields: ['storeId', 'gatawayId'],
      type: 'unique',
      name: 'unique_constraint'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('integerates');
  }
};