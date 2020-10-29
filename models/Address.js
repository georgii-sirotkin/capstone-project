'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

class Address extends Model {
};

Address.init({
  line1: DataTypes.STRING,
  line2: DataTypes.STRING,
  city: DataTypes.STRING,
  province: DataTypes.STRING,
  country: DataTypes.STRING,
  postalCode: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Address',
  underscored: true,
});

module.exports = Address;
