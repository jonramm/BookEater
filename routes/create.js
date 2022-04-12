const express = require('express')
const router = express.Router()
const db = require('../dbcon')

router.post('/user', (req, res) => {
	inserts = [req.body.firstName, req.body.lastName, req.body.email, req.body.password];
	sql_insert_user = 
	"INSERT INTO users (fname, lname, email, password) VALUES (?,?,?,?)";
	
    db.query(sql_insert_user, inserts, (err, result) => {
        if(err) {
          console.log(err)
		  res.write(JSON.stringify(err));
		  res.send();
        }
        res.send(result)
      })
})

module.exports = router