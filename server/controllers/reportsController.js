const db = require('../dbcon')
require('dotenv').config()
const sequelize = require('../sequelizeDbConn')
const { getUserByToken } = require('../models/userModel')
const { getReportByUserAndBookId, getReportByUserAndReportId, updateReport, addReport } = require('../models/reportModel')

const fetchReport = async (req, res) => {
    try {
        console.log('Fetching report...')
        console.log(req.body)
        const cookies = req.cookies
        if (!cookies?.jwt) return res.sendStatus(401)
        const refreshToken = cookies.jwt
        getUserByToken(refreshToken).then((user) => {
            getReportByUserAndBookId(user.email, req.body.id).then((report) => {
                console.log(report)
                res.send(report)
            })
        })
    } catch (err) {
        console.log(err)
    }
}

const editReport = async (req, res) => {
    try {
        console.log('Updating report...')
        const cookies = req.cookies
        if (!cookies?.jwt) return res.sendStatus(401)
        const refreshToken = cookies.jwt
        getUserByToken(refreshToken).then((user) => {
            if (req.body.id) {
                getReportByUserAndReportId(user.email, req.body.id).then((report) => {
                    console.log("Request body: ", req.body)
                    updateReport(req.body.id, req.body.title, req.body.author, req.body.report)
                    res.status(200).json({ "message": "Report updated!" })
                })
            } else {
                addReport(user.email, req.body.report, req.body.bookId)
                res.status(200).json({ "message": "Report updated!" })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    fetchReport,
    editReport
}