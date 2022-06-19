const db = require('../dbcon')
const { getUserByToken } = require('../models/userModel')

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // no content to send back
    const refreshToken = cookies.jwt
    const foundUser = getUserByToken(refreshToken)
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204); // success, no content
    }
    // Delete refresh token in db
    inserts = [foundUser.email];
	sql_delete_token = "UPDATE users SET jwtToken = '' WHERE email = ?;";
    db.query(sql_delete_token, inserts, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ "message": err.message })
        } else {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
            res.sendStatus(204)
        }
    })
}   

module.exports = { handleLogout };
