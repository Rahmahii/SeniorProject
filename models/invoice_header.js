'use strict';
const user = require('./user')
const store = require('./store')
const payment_gatway=require('./payment_gatway')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice_header extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //models.invoice_detail.belongsTo(models.invoice_header)
      models.invoice_header.hasMany(models.invoice_detail)
    }
  }
  invoice_header.init({
    purchaseDate: DataTypes.DATE,
    totalPrice:{ type:DataTypes.DOUBLE,validate: { min: 1}},
    gatawayId: {
      type: DataTypes.INTEGER,
      references: {
        model: payment_gatway,
        key: "gatawayId"
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: "userId"
      }
    },
    storeId: {
      type: DataTypes.INTEGER,
      references: {
        model: store,
        key: "storeId"
      }
    },
    IsPaid:{
      type:DataTypes.BOOLEAN
    },
    CreditCardHolder: DataTypes.STRING,
    CreditCardNum: { type:DataTypes.STRING, validate: {isCreditCard: true} } ,
    CreditBankName: DataTypes.STRING,
    depositCardHolder: DataTypes.STRING,
    depositCardNum:{ type:DataTypes.STRING },
    depositBankName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'invoice_header',
  });
  return invoice_header;
};