'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  otp.init({
    phone: DataTypes.STRING,
    VerificationCode: DataTypes.STRING,
    isVerified:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'otp',
  });
  return otp;
};