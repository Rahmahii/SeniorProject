'use strict';
const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.store.hasMany(models.product)
      models.store.hasMany(models.invoice_header)
      models.store.hasMany(models.user)
      models.store.hasMany(models.integerate)
    }
  }
  store.init({
    name: DataTypes.STRING,
    phone: { type: DataTypes.STRING, unique: true},
    email: {
      type: DataTypes.STRING, unique: true, validate: {
        isEmail: true
      }
    },
    Location_Latitude: DataTypes.DOUBLE,
    Location_Longitude: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'store',
  });
  return store;
};