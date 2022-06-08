require('dotenv').config();
const db = require('./dbcon')

const PORT = process.env.PORT || 4000;

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT');

const { Router } = require("express");
const router = Router();

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server!')
  })
 
app.use(express.urlencoded({
    extended: true
  }));

app.use(credentials);
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());

app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))
app.use('/add-role', require('./routes/addRole'))

app.use('/users', require('./routes/api/users'));

app.use(verifyJWT)
app.use('/user-info', require('./routes/api/userInfo'))

app.get("/", (req, res) => {
  res.json({ message: "Hello!" });
}); 


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
});
