const express = require('express')
const router = express.Router()
const { validate } = require('../../utils/utils')
const {

} = require('../controllers/flag.controller')

router.post('/create-flag', validate, createFlag)

router.post('/delete-flag', validate, deleteFlag)

module.exports = router