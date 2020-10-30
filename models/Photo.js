'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

class Photo extends Model {
}

Photo.init({
  name: DataTypes.STRING,
  url: {
    type: DataTypes.VIRTUAL,
    get() {
      return `https://s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${process.env.AWS_BUCKET}/${this.name}`;
    },
  }
}, {
  sequelize,
  modelName: 'Photo',
  underscored: true,
});

module.exports = Photo;
