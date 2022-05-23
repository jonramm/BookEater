const db = require('../dbcon')

const getAllUsers = async (req, res) => {
    db.query("SELECT email FROM users;", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.json(result)
    })
}

module.exports = {
    getAllUsers
}