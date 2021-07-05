const express = require('express')
const router = express.Router()
const {
  googleLogin
} = require('../controllers/auth.controller')

// Remove login and signup because only google auth allowed now
// router.post('/signup', validateRules('signup'), validate, signup)

// router.post('/login', validateRules('login'), validate, login)

router.post('/google', googleLogin)

module.exports = router
