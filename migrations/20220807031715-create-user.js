'use strict';

const { sequelize } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
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
        type: Sequelize.INTEGER,
        allowNull: true
      },
      // Location_Latitude: {
      //   type: Sequelize.DOUBLE,
      //   allowNull:true
      // },
      // Location_Longitude:{
      //   type: Sequelize.DOUBLE,
      //  allowNull:true
      // },
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
        type: Sequelize.INTEGER,  references: { model: 'Roles', key: 'id' }, onUpdate: 'CASCADE',
        allowNull: true,

      },
      storeId: {
        type: Sequelize.INTEGER,  references: { model: 'Stores', key: 'id' }, onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('Users');
  }
};