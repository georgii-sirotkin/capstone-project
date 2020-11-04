'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Photo = require('./Photo');
const Address = require('./Address');

class Hotel extends Model {
}

Hotel.init({
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  website: DataTypes.STRING,
  description: DataTypes.TEXT,
  creatorId: DataTypes.INTEGER,
  thumbnailPhotoId: DataTypes.INTEGER,
  addressId: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'Hotel',
  underscored: true,
});

Hotel.belongsTo(Photo, {
  foreignKey: 'thumbnailPhotoId',
  constraints: false,
  as: 'thumbnailPhoto'
});

Hotel.belongsTo(Address, {
  foreignKey: 'addressId',
  constraints: false,
  as: 'address'
});

module.exports = Hotel;
