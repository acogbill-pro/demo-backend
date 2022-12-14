// ~/routes/user?id=Example_User_ID&anon=false

const express = require('express')
const checkKey = require('../middleware/auth.js')
const router = express.Router()
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get('/', (req, res, next) => {
    const requestKey = req.get('Authorization')

    if (!checkKey(requestKey)) {
        res.send({response: 'POST', status: 401})
        return
    }

    // As documented here https://segment.com/docs/profiles/profile-api/
    const userID = req.query.id
    
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // NOTE the `:` after the Token in the below
            'Authorization': `Basic ${Buffer.from(`${process.env.PROFILES_ACCESS_TOKEN}:`).toString('base64')}`,
        },
    }

    // Because the URL changes if sending an anonymous ID
    const idLabel = req.query.anon === 'true' ? 'anonymous_id' : 'user_id'

    const requestURL = `https://profiles.segment.com/v1/spaces/${process.env.PROFILES_SPACE_ID}/collections/users/profiles/${idLabel}:${userID}/traits`

    const fetchedProfile = fetch(requestURL, options)
    .then((response) => {
        const convertToJSON = response.json()
        const status = convertToJSON.then((json) => {
            res.send(json)
        })
    }).catch(() => res.send({status:999}))  
})

/*router.post('/', (req, res, next) => {
    res.send({response: 'POST'})
  })*/

module.exports = router