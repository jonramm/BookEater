require('dotenv').config();
const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.MYSQL_CONNECTION_STRING);
}

module.exports = sequelize;
