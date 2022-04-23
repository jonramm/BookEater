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

const retrieve = require('./routes/retrieve')
const create = require('./routes/create')
const destroy = require('./routes/destroy')
const update = require('./routes/update')

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


app.use('/retrieve', retrieve)
app.use('/create', create)
app.use('/destroy', destroy)
app.use('/update', update)

app.get("/", (req, res) => {
  res.json({ message: "Hello!" });
});

// const { check } = require("express-validator");
// const { validateInput } = require("../middleware/validate-input");
// const { login } = require("./controllers/auth");

// app.use(express.static(path.join(__dirname, 'build')));

app.post('/login', (req, res) => {
  res.send({
    token: 'test1234'
  })
})

// app.post('/api/create/user', (req, res) => {
//   console.log('made it to test endpoint')
// })

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
});
