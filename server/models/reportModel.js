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

const addReport = async (user, report, bookId) => {
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    date = date.slice(0, 10)
    console.log('Date', date)
    newReport = await Report.create({
        user: user, 
        report: report, 
        dateAdded: date, 
        bookId: bookId})
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

const getReportByUserAndReportId = async (email, id) => {
    const report = await Report.findOne({
        where: {
            user: email,
            id: id
        }
    })
    return report
}

const updateReport = async (id, title, author, report) => {
    await Report.update({
        title: title,
        author: author,
        report: report
    }, {
        where: {
            id: id
        }
    })
}

module.exports = {
    addReport,
    Report,
    reportsList,
    getReportByUserAndBookId,
    getReportByUserAndReportId,
    updateReport
}