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
    const books = await UserBook.findAll({
        where: {
            user: email
        }
    })
    return books
}

module.exports = { 
    Book,
    createBook, 
    deleteBook, 
    booksList,
    getBooks
  }