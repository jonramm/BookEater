const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDbConn')
const { Report } = require('./reportModel')
const { UserBook } = require('./userBookModel')

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, 
    {
        tableName: 'books',
        timestamps: false
    }
)

// Book.belongsToMany(Report)

const createBook = async (title, author) => {
    newBook = await Book.create({title: title, author: author})
    console.log(`Adding ${newBook.title}...`)
    return newBook.id
  }

const deleteBook = async (id) => {
await Book.destroy({
    where: {
        id: id
    }
})
}
  
const booksList = async () => {
    const books = await Book.findAll();
    console.log("All books:", JSON.stringify(books, null, 2));
}

const getBooks = async (email) => {
    const [results, metadata] = await sequelize.query(`select b.title, b.author from user_books ub join books b on ub.bookId = b.id where ub.user = '${email}';`)
    return JSON.stringify(results)
}

const getBookById = async (id) => {
    const book = await Book.findOne({
        where: {
            id: id
        }
    })
    return book
}

module.exports = { 
    Book,
    createBook, 
    deleteBook, 
    booksList,
    getBooks,
    getBookById
  }