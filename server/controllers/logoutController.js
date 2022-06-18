const db = require('../dbcon')
const { getUserByToken } = require('../models/userModel')

const handleLogout = async (req, res) => {
    // On client, also delete access token
    console.log("Logging out...")
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // no content to send back
    const refreshToken = cookies.jwt
    // inserts = [refreshToken];
	  // sql_refresh_user = "SELECT * FROM users WHERE jwtToken = ?;";

    // const getUser = async () => {
    //   return new Promise((resolve, reject) => {
    //     db.query(sql_refresh_user, inserts, (err, result) => {
    //       if(err) {
    //         console.log(err)
    //       } else {
    //         resolve(JSON.stringify(result))
    //       }
    //     })
    //   })  
    // }
    // foundUser = JSON.parse(await getUser())[0]
    const foundUser = getUserByToken(refreshToken)
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204); // success, no content
    }
    // Delete refresh token in db
    inserts = [foundUser.email];
    console.log(foundUser.email)
	  sql_delete_token = "UPDATE users SET jwtToken = '' WHERE email = ?;";
    db.query(sql_delete_token, inserts, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Clearing token in db...")
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
            res.sendStatus(204)
        }
    })
}   

module.exports = { handleLogout };
