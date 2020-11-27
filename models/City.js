'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

class City extends Model {
}

City.init({
  name: DataTypes.STRING,
  code: DataTypes.STRING,
  state: DataTypes.STRING,
  country: DataTypes.STRING
}, {
  sequelize,
  modelName: 'City',
  underscored: true,
});

module.exports = City;
