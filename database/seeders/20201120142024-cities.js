'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cities', [
      {
        name: 'Paris',
        code: 'PAR',
        state: null,
        country: 'France',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Toronto',
        code: 'YTO',
        state: 'Ontario',
        country: 'Canada',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Niagara Falls',
        code: 'IAG',
        state: 'Ontario',
        country: 'Canada',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Kitchener',
        code: 'ALO',
        state: 'Ontario',
        country: 'Canada',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Waterloo',
        code: 'YKF',
        state: 'Ontario',
        country: 'Canada',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cities', null, {});
  }
};
