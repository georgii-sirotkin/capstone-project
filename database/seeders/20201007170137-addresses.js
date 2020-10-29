'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('addresses', [
      {
        line1: '30 Carlton Street',
        line2: null,
        city: 'Toronto',
        province: 'ON',
        country: 'Canada',
        postal_code: 'M5B 2E9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        line1: '225 Front Street West',
        line2: null,
        city: 'Toronto',
        province: 'ON',
        country: 'Canada',
        postal_code: 'M5V 2X3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        line1: '335 Queen St W',
        line2: null,
        city: 'Toronto',
        province: 'ON',
        country: 'Canada',
        postal_code: 'M5V 2A1',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('addresses', null, {});
  }
};
