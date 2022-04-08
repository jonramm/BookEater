require('dotenv').config();
const db = require('./dbcon')

const PORT = process.env.PORT || 4000;

const express = require('express');
const app = express();
const path = require('path');

const retrieve = require('./routes/retrieve')
const create = require('./routes/create')
const destroy = require('./routes/destroy')
const update = require('./routes/update')

// db.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL server!')
//   })
 
app.use(express.urlencoded({
    extended: true
  }));

app.use('/retrieve', retrieve)
app.use('/create', create)
app.use('/destroy', destroy)
app.use('/update', update)

app.use(express.json())

app.use(express.static(path.join(__dirname, 'build')));

app.use('/login', (req, res) => {
  res.send({
    token: 'test1234'
  })
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
});
