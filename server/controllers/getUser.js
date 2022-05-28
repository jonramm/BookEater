const db = require('./dbcon')

const getUser = async (auth) => {
    db.query(`SELECT * FROM users WHERE userName = "${auth.email}";`, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
}

module.exports = {
    getUser,
}