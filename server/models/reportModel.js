const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDbConn')

const Report = sequelize.define('Report', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    report: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    dateAdded: {
        type: DataTypes.DATE,
        allowNull: false
    }
    }, 
    {
        tableName: 'reports',
        timestamps: false
    }
)
