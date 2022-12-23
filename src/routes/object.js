// ~/routes/user?id=Example_User_ID&anon=false

const express = require('express')
const checkKey = require('../middleware/auth.js')
const router = express.Router()

router.get('/', (req, res, next) => {
    const requestKey = req.get('Authorization')

    if (!checkKey(requestKey)) {
        console.log('key check failed')
        res.send({response: 'POST', status: 401})
        return
    }

    // As documented here https://segment.com/docs/profiles/profile-api/
    const userID = req.query.id
    
    console.log('received GET request') 
    res.send({response: 'GET', status: 200})
})

router.post('/', (req, res, next) => {
    const requestKey = req.get('Authorization')

    if (!checkKey(requestKey)) {
        console.log('key check failed')
        res.send({response: 'POST', status: 401})
        return
    }

    console.log('post request received', req.body)//.body
    res.send({response: 'POST', status: 200})
})

module.exports = router