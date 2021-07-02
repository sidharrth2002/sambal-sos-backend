const express = require('express')
const router = express.Router()
const { validate } = require('../../utils/utils')
const {
  validateRules,
  signup,
  login,
  googleLogin
} = require('../controllers/auth.controller')

router.post('/signup', validateRules('signup'), validate, signup)

router.post('/login', validateRules('login'), validate, login)

router.post('/google', googleLogin)

module.exports = router
