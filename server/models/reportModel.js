const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDbConn')
const { Book } = require('./bookModel')

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
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }, 
    {
        tableName: 'reports',
        timestamps: false
    }
)

// Report.hasOne(Book)

const addReport = async (user, report, dateAdded, bookId) => {
    newReport = await Report.create({user: user, report: report, dateAdded: dateAdded, bookId: bookId})
    console.log(`Adding ${newReport.user}'s report...`)
}

const reportsList = async () => {
    const reports = await Report.findAll();
    console.log("All reports:", JSON.stringify(reports, null, 2));
}

const getReportByUserAndBookId = async (email, id) => {
    const report = await Report.findOne({
        where: {
            user: email,
            bookId: id
        }
    })
    return report
}

module.exports = {
    addReport,
    Report,
    reportsList,
    getReportByUserAndBookId
}