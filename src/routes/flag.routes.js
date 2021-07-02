const express = require('express')
const router = express.Router()
const { validate } = require('../../utils/utils')
const { createFlag, getAllFlags, deleteFlag } = require('../controllers/flag.controller')

router.get('/getall', getAllFlags)

router.post('/createflag', createFlag)

router.post('/deleteflag', deleteFlag)

module.exports = router