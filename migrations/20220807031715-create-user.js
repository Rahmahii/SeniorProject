'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING,
        unique: true
      },
      gender: {
        type: Sequelize.TINYINT,
        allowNull: true
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      IsApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      roleId: {
        type: Sequelize.INTEGER,  references: { model: 'roles', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: true,

      },
      storeId: {
        type: Sequelize.INTEGER,  references: { model: 'stores', key: 'id' }, onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('users');
  }
};