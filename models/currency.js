'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.currency.hasMany(models.product)
    }
  }
  currency.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,unique: true
  }, {
    sequelize,
    modelName: 'currency',
  });
  return currency;
};