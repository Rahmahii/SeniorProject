'use strict';
const invoice_header = require('./invoice_header')
const product = require('./product')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  invoice_detail.init({
    invoiceId: {
      type: DataTypes.INTEGER,
      references: {
        model: invoice_header,
        key: "invoiceId"
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: product,
        key: "productId"
      }
    },
    quantity: DataTypes.INTEGER,validate: { min: 1},
    PurchasingPrice: DataTypes.DOUBLE,validate: { min: 1}
  }, {
    sequelize,
    modelName: 'invoice_detail',
  });
  return invoice_detail;
};