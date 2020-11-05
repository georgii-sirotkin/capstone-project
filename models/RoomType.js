'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

class RoomType extends Model {
}

RoomType.init({
  name: DataTypes.STRING
}, {
  sequelize,
  modelName: 'RoomType',
  underscored: true,
});
