const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDbConn')

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, 
    {
        tableName: 'books',
        timestamps: false
    }
)

module.exports = { Book }