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
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.TINYINT,
        allowNull: true,
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
        type: Sequelize.INTEGER, references: { model: 'roles', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: false,

      },
      storeId: {
        type: Sequelize.INTEGER, references: { model: 'stores', key: 'id' }, onUpdate: 'CASCADE',
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

    }); await queryInterface.addConstraint('users', {
      fields: ['email', 'roleId'],
      type: 'unique',
      name: 'unique_email'
    }); await queryInterface.addConstraint('users', {
      fields: ['phone', 'roleId'],
      type: 'unique',
      name: 'unique_phone'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};