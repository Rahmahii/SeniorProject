'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Store.init({
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
    modelName: 'Store',
  });
  return Store;
};