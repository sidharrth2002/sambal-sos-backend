const express = require('express')
const router = express.Router()

const { ValidateJWT } = require('../../utils/utils')
const { getAllUsers, createTestUser } = require('../controllers/user.controller')
const { route } = require('./auth.routes')

router.post('/createtest', createTestUser)

router.get('/users', getAllUsers)

module.exports = router
