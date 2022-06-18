const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDbConn');

const Nourishment = sequelize.define('Nourishment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        tableName: 'nourishment',
        timestamps: false
    }
)

module.exports = {
    Nourishment
}