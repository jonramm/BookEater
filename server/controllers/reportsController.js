const db = require('../dbcon')
require('dotenv').config()
const sequelize = require('../sequelizeDbConn')
const { getUserByToken } = require('../models/userModel')
const { getReportByUserAndBookId, getReportByUserAndReportId, updateReport } = require('../models/reportModel')

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
      } catch(err) {
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
          getReportByUserAndReportId(user.email, req.body.id).then((report) => {
            console.log(report)
            updateReport(report.id, req.body.title, req.body.author, req.body.report)
            res.send(report)      
          })
        })
      } catch(err) {
        console.log(err)
      }
}

module.exports = {
    fetchReport,
    editReport
}