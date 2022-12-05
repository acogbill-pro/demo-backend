// /routes/posts.js
const express = require('express')
const string = require('../middleware/example.js')
const router = express.Router()

router.get('/', (req, res, next) => {
  //res.send('You have hit GET /posts endpoint')
  res.send({response: string})
})

module.exports = router