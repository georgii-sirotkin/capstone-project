require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql',
    seederStorage: 'sequelize',
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql',
    seederStorage: 'sequelize',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql',
    seederStorage: 'sequelize',
  }
};