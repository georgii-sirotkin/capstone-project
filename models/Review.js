'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

class Review extends Model {
}

Review.init({
  title: DataTypes.STRING,
  text: DataTypes.TEXT,
  rating: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
  hotel_id: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Review',
  underscored: true,
});