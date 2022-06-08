const db = require('../dbcon')

const getAllUsers = async (req, res) => {
    db.query("SELECT email FROM users;", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.json(result)
    })
}

const createNewUser = (fName, lName, email, hashPassword) => {
    inserts = [fName, lName, email, hashPassword]
    sql_insert_user = "INSERT INTO users (fName, lName, email, password) VALUES (?,?,?,?)";
    db.query(sql_insert_user, inserts, (err, res) => {
        if(err) {
          console.log(err)
          if (err.code === 'ER_DUP_ENTRY') {
            res.sendStatus(409)
          }
          res.status(500).json({"message": err.message}) 
        } else {
            res.status(201).json({'success': `New user ${email} created!`})
        }
      })
}

const addUserRole = (email, role) => {
    inserts = [email, role]
    sql_insert_user_role = "INSERT INTO user_roles (user, role) VALUES (?,?);"
    db.query(sql_insert_user_role, inserts, (err, res) => {
        if(err) {
            console.log(err)
            res.status(406).json({'error': 'role assignment failed'})
          } else {
              db.query(`INSERT INTO user_roles (user, role) VALUES ("${email}", 1);`)
              res.status(201).json({'success': `New user ${email} created!`})
          }
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    addUserRole
}