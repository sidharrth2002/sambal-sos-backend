const express = require('express')
const router = express.Router()
const { validate } = require('../../utils/utils')
const { createTestFlag, getFlags, createFlag } = require('../controllers/flag.controller')

router.post('/createtest', createTestFlag)

router.get('/getall', getFlags)

router.post('/createflag', createFlag)

// router.post('/delete-flag', validate, deleteFlag)

module.exports = router