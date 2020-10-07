const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('Database url is not specified');
}

// Option 1: Passing a connection URI
const sequelize = new Sequelize(databaseUrl, {
  define: {
    underscored: true,
  }
});

module.exports = sequelize;
