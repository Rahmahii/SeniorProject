'use strict';
const { Model } = require("sequelize")
//const Validator = require("fastest-validator");
const role = require('./role')
const store = require('./store')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasMany(models.invoice_header)
      models.user.hasMany(models.payment_card)
      models.user.belongsTo(models.role)
      models.user.belongsTo(models.store)
    }
  }
  user.init({

    name: {
      type: DataTypes.STRING, validate: {
        len: [3, 100]
      }
    },
    email: {
      type: DataTypes.STRING, validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
    },
    phone: { type: DataTypes.STRING, validate: { is: /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/ } },
    gender: { type: DataTypes.INTEGER, validate: { len: [1, 1] } },//1 man , 2 woman
    isActive: DataTypes.BOOLEAN,
    IsApproved: DataTypes.BOOLEAN,
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: role,
        key: "roleId"
      }

    },
    storeId:  {
      type: DataTypes.INTEGER,
      references: {
        model: store,
        key: "storeId"
      }

    },
  },
    {
      sequelize,
      modelName: 'user',
    });
  return user;
};