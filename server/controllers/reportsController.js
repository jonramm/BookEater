require('dotenv').config()
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
        console.log(req.body)
        const cookies = req.cookies
        if (!cookies?.jwt) return res.sendStatus(401)
        const refreshToken = cookies.jwt
        getUserByToken(refreshToken).then((user) => {
            if (req.body.reportId) {
                getReportByUserAndReportId(user.email, req.body.reportId).then((report) => {
                    updateReport(report.id, req.body.title, req.body.author, req.body.report, req.body.flavor)
                    res.status(200).json({ "message": "Report updated!" })
                })
            } else {
                addReport(user.email, req.body.report, req.body.bookId, req.body.flavor).then(() => {
                    res.status(200).json({ "message": "Report updated!" })
                })    
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