// /routes/posts.js
const express = require('express')
//const Buffer = require('buffer')
const string = require('../middleware/example.js')
const router = express.Router()
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get('/', (req, res, next) => {
    const userID = req.query.id
    
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // NOTE the `:` after the Token in the below
            'Authorization': `Basic ${Buffer.from(`${process.env.PROFILES_ACCESS_TOKEN}:`).toString('base64')}`,
            },
        }

        const idLabel = req.query.anon ? 'anonymous_id' : 'user_id'

        const requestURL = `https://profiles.segment.com/v1/spaces/${process.env.PROFILES_SPACE_ID}/collections/users/profiles/${idLabel}:${userID}/traits`

        const fetchedProfile = fetch(requestURL, options)
        .then((response) => {
            res.send(response)
            /*if (response.ok) {
                const convertToJSON = response.json()
                const status = convertToJSON.then((json) => {
                    console.log(json)
                })
            } else {
                console.log(response.status)
            }*/     
        }).catch(res.send({response: {status:500}}))
    /*const headers = {
      const requestURL = 
      `https://cogbill-demo-4919.twil.io/sms?From=${encodeURIComponent('+1')}${encodeURIComponent('6086315755')}&To=${encodeURIComponent('+1')}${encodeURIComponent('9177576756')}&Body=${encodeURIComponent('Ahoy from Express')}`

      */
    
})

router.post('/', (req, res, next) => {
    //res.send('You have hit GET /posts endpoint')
    res.send({response: 'POST'})
  })

module.exports = router