const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDbConn')

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, 
    {
        tableName: 'roles',
        timestamps: false
    }
)

module.exports = {
    Role
}