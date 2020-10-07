'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainTextPassword = 'secret';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      first_name: 'John',
      last_name: 'Doe',
      email: 'user@example.com',
      password: bcrypt.hashSync(plainTextPassword, saltRounds),
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      first_name: 'Bob',
      last_name: 'Smith',
      email: 'admin@example.com',
      password: bcrypt.hashSync(plainTextPassword, saltRounds),
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date()
    },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
