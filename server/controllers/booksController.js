const db = require('../dbcon')
require('dotenv').config()
const sequelize = require('../sequelizeDbConn')
const { Book } = require('../models/bookModel')

const addBook = async (req, res) => {
    console.log('Adding book...')
    const {title, author} = req.body
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    db.query(
        `INSERT INTO books (title, author) VALUES ('${title}', '${author}'); INSERT INTO user_books (bookId, user) SELECT (select id from books order by id desc limit 1) as bookId, email from users where jwtToken ='${refreshToken}'`,
         (err, result) => {
            if(err) {
                console.log(err)
                res.status(500).json({"message": err.message}) 
              } else {
                res.sendStatus(200);
              }
         }
    )
}

const booksList = async () => {
  const books = await Book.findAll();
  console.log("All books:", JSON.stringify(books, null, 2));
}

module.exports = { addBook, booksList }