const db = require('../dbcon')

const getUserInfo = async (req, res) => {
    email = req.body.email
    db.query(`SELECT email FROM users WHERE email = '${email}';`, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.json(result)
    })
}

module.exports = { getUserInfo }