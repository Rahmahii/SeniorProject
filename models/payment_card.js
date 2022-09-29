'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment_card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payment_card.init({
    userId: DataTypes.INTEGER,
    cardHolderName: DataTypes.STRING,
    cardNum: { type:DataTypes.STRING, validate: {isCreditCard: true} },
    CVV: DataTypes.INTEGER,
    expiresDate:{type:DataTypes.DATE,validate: {isAfter: new Date()}}, 
  }, {
    sequelize,
    modelName: 'payment_card',
  });
  return payment_card;
};