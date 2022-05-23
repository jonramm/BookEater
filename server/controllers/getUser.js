const db = require('./dbcon')

const getUser = async (userName, password) => {
    db.query(`SELECT * FROM users WHERE userName = "${userName}" AND password = "${password}";`, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
}

module.exports = {
    getUser,
}