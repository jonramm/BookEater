const express = require('express')
const router = express.Router()
const db = require('../dbcon')

router.post('/user', (req, res) => {

	inserts = [req.body.email, req.body.password];
	sql_insert_user = "INSERT INTO users (email, password) VALUES (?,?)";
	
    db.query(sql_insert_user, inserts, (err, result) => {
        if(err) {
          console.log(err)
          if (err.code === 'ER_DUP_ENTRY') {
            res.sendStatus(409)
          }
		      
        } else {
        res.send(result)
        }
      })
})

module.exports = router