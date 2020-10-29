'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('hotels', 'address_id', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      after: 'description',
      references: {
        model: {
          tableName: 'addresses'
        },
        key: 'id'
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('hotels', 'address_id');
  }
};
