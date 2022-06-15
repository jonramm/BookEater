const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDbConn')

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    fName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jwtToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bookstore: {
        type: DataTypes.STRING,
        allowNull: true
    },
    favBook: {
        type: DataTypes.STRING,
        allowNull: true
    },
    quote: {
        type: DataTypes.STRING,
        allowNull: true
    }
    }, 
    {
        tableName: 'users',
        timestamps: false
    }
)

const addUser = async (email, fName, lName, password) => {
    newUser = await User.create({email: email, fName: fName, lName: lName, password: password})
    console.log(`Adding ${newUser.email}...`)
}

const usersList = async () => {
    const users = await User.findAll();
    console.log("All users:", JSON.stringify(users, null, 2));
  }

const deleteUser = async (email) => {
    await User.destroy({
        where: {
            email: email
        }
    })
}

const updateUserInfo = async (jwtToken, fName, lName, location, bookstore, favBook, quote) => {
    await User.update({
        fName: fName,
        lName: lName,
        location: location,
        bookstore: bookstore,
        favBook: favBook,
        quote: quote
    }, {
        where: {
            jwtToken: jwtToken
        }
    })
}

const updateUserToken = async (email, token) => {
    await User.update({
        jwtToken: token
    }, {
        where: {
            email: email
        }
    })
}

const getUser = async (email) => {
    const [results, metadata] = await sequelize.query(`SELECT email, password, jwtToken, group_concat(ur.role) as roles FROM users JOIN user_roles ur ON email = ur.user WHERE email = '${email}';`)
    return JSON.stringify(results)
}

const getUserByToken = async (token) => {
    try {
        const user = await User.findOne({
            where: {
                jwtToken: token
            },
            attributes: ['email', 'fName', 'lName', 'location', 'bookstore', 'favBook', 'quote']
        })
        return user
    } catch(err) {
        console.log(err)
    }
  }

module.exports = { 
    User,
    usersList, 
    addUser, 
    deleteUser,
    updateUserInfo,
    updateUserToken,
    getUser,
    getUserByToken
}