'use strict';
const {
  Model
} = require('sequelize');
const store = require('./store')
const category = require('./category')
const currency = require('./currency')
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,validate: { min: 1},
    sellPrice: DataTypes.DOUBLE,validate: { min: 1},
    barcodeNum: DataTypes.BIGINT,
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: category,
        key: "categoryId"
      }
    },
    storeId: {
      type: DataTypes.INTEGER,
      references: {
        model: store,
        key: "storeId"
      }
    },
    currencyId: {
      type: DataTypes.INTEGER,
      references: {
        model: currency,
        key: "currencyId"
      }
    }
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};