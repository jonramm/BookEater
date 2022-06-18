require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

let sequelize

if (process.env.JAWS_DB) {
    sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
    sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
        dialect: 'mysql'
    })
}

module.exports = sequelize