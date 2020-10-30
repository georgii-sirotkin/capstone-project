'use strict';

const User = require('../../models/User');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('photos', [
      {
        name: 'sheraton-hotel.webp',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'hotel2.webp',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'hotel3.webp',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('photos', null, {})
  }
};
