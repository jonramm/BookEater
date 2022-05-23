const db = require('../dbcon')

const getUserInfo = async (req, res) => {
    token = req.body.token
    db.query(`SELECT email FROM users WHERE jwtToken = ${token};`, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.json(result)
    })
}

module.exports = {
    getUserInfo
}