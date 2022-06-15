const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDbConn');
const { Report } = require('./reportModel');
const { Nourishment } = require('./nourishmentModel')

const ReportNourishment = sequelize.define('ReportNourishment', {
    nourishmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Nourishment,
            key: 'id'
        }
    },
    reportId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Report,
            key: 'id'
        }
    }
},
    {
        tableName: 'report_nourishment',
        timestamps: false
    }
)

ReportNourishment.removeAttribute('id')

const addReportNourishment = async (reportId, nourishmentArray) => {
    for (const num of nourishmentArray) {
        const newReportNourishment = await ReportNourishment.create({ reportId: reportId, nourishmentId: num })
        console.log(`Adding ${num} to report ${reportId}...`)
    }
    return reportId
}

module.exports = {
    ReportNourishment, 
    addReportNourishment
}