'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

class Address extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
};

Address.init({
  line1: DataTypes.STRING,
  line2: DataTypes.STRING,
  city: DataTypes.STRING,
  province: DataTypes.STRING,
  country: DataTypes.STRING,
  postal_code: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Address',
  underscored: true,
});

module.exports = Address;
