'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

class Room extends Model {
}

Room.init({
  type: DataTypes.STRING,
  hotel_id: DataTypes.INTEGER,
  price: DataTypes.DECIMAL
}, {
  sequelize,
  modelName: 'Room',
  underscored: true,
});

module.exports = Room;
