// ~/app.js

require('dotenv').config()
var cors = require('cors')
const express = require('express')
const logger = require('morgan')

const app = express()
const PORT = process.env.PORT

app.use(logger('dev'))

app.use(cors())

app.use(express.json()) //http://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false })) //http://expressjs.com/en/5x/api.html#express.urlencoded

const userRouter = require('./routes/user')

app.use('/user', userRouter)

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
})

module.exports = app