'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  hotel.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    description: DataTypes.TEXT,
    creator_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'hotel',
    underscored: true,
  });
  return hotel;
};