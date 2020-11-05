'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

class Room extends Model {
}

Room.init({
  type_id: DataTypes.INTEGER,
  hotel_id: DataTypes.INTEGER,
  price: DataTypes.DECIMAL
}, {
  sequelize,
  modelName: 'Room',
  underscored: true,
});
