const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDbConn')
const { User } = require('./userModel')
const { Book } = require('./bookModel')

const UserBook = sequelize.define('UserBook', {
    user: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'email'
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book,
            key: 'id'
        }
    }
    }, 
    {
        tableName: 'user_books',
        timestamps: false
    }
)

/* remove automatic sequelize 'id' field */
UserBook.removeAttribute('id')

const userBooksList = async () => {
    const userBooks = await UserBook.findAll();
    console.log("All user books:", JSON.stringify(userBooks, null, 2));
}

const addUserBook = async (jwtToken, bookId) => {
    const user = await User.findOne({
        where: {
            jwtToken: jwtToken
        }
    })
    const newUserBook = await UserBook.create({user: user.email, bookId: bookId})
    console.log(`Adding ${newUserBook.user} to book ${newUserBook.bookId}...`)
}

module.exports = {
    UserBook,
    userBooksList,
    addUserBook
}