const { DataTypes } = require('sequelize');
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
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    flavor: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        tableName: 'reports',
        timestamps: false
    }
)

const addReport = async (user, report, bookId, flavor) => {
    try {
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        date = date.slice(0, 10)
        console.log("User: ", user)
        newReport = await Report.create({
            user: user,
            report: report,
            dateAdded: date,
            bookId: bookId,
            flavor: flavor
        })
        console.log(`Adding ${newReport.user}'s report...`)
        return newReport
    } catch(err) {
        console.log(err)
        res.status(500).json({ "message": err })
    }
    
}

const deleteReport = async (reportId) => {
    try {
        await Report.destroy({
            where: {
                id: reportId
            }
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({ "message": err })
    }
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

const updateReport = async (id, title, author, report, flavor) => {
    await Report.update({
        title: title,
        author: author,
        report: report,
        flavor: flavor
    }, {
        where: {
            id: id
        }
    })
}

module.exports = {
    addReport,
    Report,
    getReportByUserAndBookId,
    getReportByUserAndReportId,
    updateReport,
    deleteReport
}