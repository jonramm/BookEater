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

app.use(express.static(path.join(__dirname, 'build')));

app.get('/hello', (req, res) => {
  res.json({"message": "hello"})
})

app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))
app.use('/add-role', require('./routes/addRole'))

app.use(verifyJWT)
app.use('/user-info', require('./routes/api/userInfo'))
app.use('/users', require('./routes/api/users'));
app.use('/add-book', require('./routes/addBook'))
app.use('/get-books', require('./routes/getBooks'))
app.use('/get-report', require('./routes/getReport'))
app.use('/update-report', require('./routes/updateReport'))
app.use('/destroy-user-book', require('./routes/destroyUserBook'))
app.use('/update-info', require('./routes/updateUserInfo'))
app.use('/add-book-and-nourishment', require('./routes/addBookAndNourishment'))
app.use('/get-nourishment', require('./routes/getNourishment'))
app.use('/add-nourishment', require('./routes/addNourishment'))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
});
