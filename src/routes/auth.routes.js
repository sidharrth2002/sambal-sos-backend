const express = require('express')
const router = express.Router()
const {
  login,
  googleLogin,
  validateRules
} = require('../controllers/auth.controller')
const { validate } = require('../../utils/utils');

// Remove login and signup because only google auth allowed now
// router.post('/signup', validateRules('signup'), validate, signup)

router.post('/login', validateRules('login'), validate, login)

router.post('/google', googleLogin)

module.exports = router
