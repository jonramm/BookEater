const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDbConn')

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    fName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jwtToken: {
        type: DataTypes.STRING,
        allowNull: true
    }
    }, 
    {
        tableName: 'users',
        timestamps: false
    }
)

module.exports = { User }