const db = require('../dbcon')

const getUserInfo = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    db.query(`SELECT email FROM users WHERE jwtToken = '${refreshToken}';`, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.json(result)
    })
}

module.exports = { getUserInfo }