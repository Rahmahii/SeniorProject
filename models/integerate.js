'use strict';
const store = require('./store')
const payment_gatway = require('./payment_gatway')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class integerate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.integerate.belongsTo(models.store)
      models.integerate.belongsTo(models.payment_gatway)
    }
  }
  integerate.init({
    storeId: {
      type: DataTypes.INTEGER,
      references: {
        model: store,
        key: "storeId"
      }
    },
    gatawayId: {
      type: DataTypes.INTEGER,
      references: {
        model: payment_gatway,
        key: "gatawayId"
      }
    },
    accountNum:{ type:DataTypes.STRING, validate: {isCreditCard: true} },
    accountName: DataTypes.STRING,
    bankName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'integerate',
  });
  return integerate;
};