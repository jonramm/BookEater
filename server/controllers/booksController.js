const db = require('../dbcon')
require('dotenv').config()
const sequelize = require('../sequelizeDbConn')
const { createBook } = require('../models/bookModel')
const { addUserBook } = require('../models/userBookModel')

const addBook = async (req, res) => {
    console.log('Adding book...')
    const {title, author} = req.body
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    createBook(title, author).then((newId) => {
      addUserBook(refreshToken, newId).then(() => {
        res.status(200)
      }).catch((err) => {
        console.log(err)
        res.status(500).json({"message": err.message}) 
      })
    }).catch((err) => {
      console.log(err)
      res.status(500).json({"message": err.message}) 
    })

    // db.query(
    //     `INSERT INTO books (title, author) VALUES ('${title}', '${author}'); INSERT INTO user_books (bookId, user) SELECT (select id from books order by id desc limit 1) as bookId, email from users where jwtToken ='${refreshToken}'`,
    //      (err, result) => {
    //         if(err) {
    //             console.log(err)
    //             res.status(500).json({"message": err.message}) 
    //           } else {
    //             res.sendStatus(200);
    //           }
    //      }
    // )
}


module.exports = { addBook }