const express = require('express')

const router = express.Router()

const authRoutes = require('./auth.routes')
const userRoutes = require('./users.routes')
const flagRoutes = require('./flag.routes');

// Auth routes
router.use('/auth', authRoutes)
// User routes
router.use('/user', userRoutes)

router.use('/flag', flagRoutes)

module.exports = router
