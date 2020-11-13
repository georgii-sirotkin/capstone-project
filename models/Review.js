'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

class Review extends Model {
}

Review.init({
  title: DataTypes.STRING,
  text: DataTypes.TEXT,
  rating: DataTypes.INTEGER,
  userId: DataTypes.INTEGER,
  hotelId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Review',
  underscored: true,
});

module.exports = Review;
