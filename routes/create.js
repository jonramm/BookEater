const express = require('express')
const router = express.Router()
const db = require('../dbcon')

router.post('/user', (req, res) => {
	
    console.log('made it to create user')

	inserts = [req.body.firstName, req.body.lastName, req.body.email, req.body.password];
	console.log(req.body)

	// sql_insert_user = 
	// "INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)";
	
    // db.query(sql_insert_user, inserts, (err, result) => {
    //     if(err) {
    //       console.log(err)
	// 	  res.write(JSON.stringify(err));
	// 	  res.end();
    //     }
    //     res.send(result)
    //   })
})

module.exports = router