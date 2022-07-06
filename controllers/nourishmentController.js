require('dotenv').config()
const { getNourishmentByReport, addReportNourishment } = require('../models/reportNourishmentModel')

const getNourishment = async (req, res) => {
    getNourishmentByReport(req.body.reportId).then((result) => {
        res.status(200).json({"nourishment": result})
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ "message": err.message })
    })
}

const addNourishment = async (req, res) => {
    try {
        addReportNourishment(req.body.reportId, req.body.nourishmentArray).then(() => {
            res.status(200).json({"message": "Nourishment added!"})
        }).catch((err) => {
            console.log(err)
            res.status(500).json({ "message": err })
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({ "message": err.message })
    }
}

module.exports = {
    getNourishment,
    addNourishment
}