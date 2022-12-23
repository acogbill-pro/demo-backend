// Example if middleware is needed
const express = require('express')

const string = 'This string is available via middleware'
function checkKey(withKey) {
    return withKey === `Basic ${Buffer.from(`${process.env.API_KEY}:`).toString('base64')}`
}

module.exports = checkKey