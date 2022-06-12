require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql'
})

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
    }
    }, 
    {
        tableName: 'users',
        timestamps: false
    }
)

console.log(User === sequelize.models.User);

// User.sync().then(()=> {
//     console.log('sync complete')
// }).catch((err) => {
//     console.log(err)
// })

const jane = User.build({ fName: "Jane", lName: 'Doe', email: 'jane@gmail.com', password: 'test' });
console.log(jane instanceof User); // true
console.log(jane.fName); // "Jane"

jane.save().then(() => {
    console.log('Jane was saved to the database!');
}).catch((err) => {
    console.log(err)
})
