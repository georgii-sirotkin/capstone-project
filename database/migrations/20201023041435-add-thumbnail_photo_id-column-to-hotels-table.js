'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('hotels', 'thumbnail_photo_id', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      after: 'description',
      references: {
        model: {
          tableName: 'photos'
        },
        key: 'id'
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('hotels', 'thumbnail_photo_id');
  }
};
