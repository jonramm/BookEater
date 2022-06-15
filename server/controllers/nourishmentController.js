const db = require('../dbcon')
require('dotenv').config()
const sequelize = require('../sequelizeDbConn')
const { getNourishmentByReport } = require('../models/reportNourishmentModel')

const getNourishment = async (req, res) => {
    console.log("Nourishment request: ", req.body)
    getNourishmentByReport(req.body.reportId).then((result) => {
        res.status(200).json({"nourishment": result})
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {
    getNourishment
}