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
      models.invoice_detail.belongsTo(models.invoice_header)
      models.invoice_detail.belongsTo(models.product)
      
    }
  }
  invoice_detail.init({
    invoiceHeaderId: {
      type: DataTypes.INTEGER,
      references: {
        model: invoice_header,
        key: "invoiceHeaderId"
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: product,
        key: "productId"
      }
    },
    quantity: {type:DataTypes.INTEGER,validate: { min: 1}},
    PurchasingPrice: {type:DataTypes.DOUBLE,validate: { min: 1}}
  }, {
    sequelize,
    modelName: 'invoice_detail',
  });
  return invoice_detail;
};