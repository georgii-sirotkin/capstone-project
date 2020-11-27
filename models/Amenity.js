'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

class Amenity extends Model {
}

Amenity.init({
  name: DataTypes.STRING,
  code: DataTypes.STRING,
  icon: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'Amenity',
  underscored: true,
});

module.exports = Amenity;
