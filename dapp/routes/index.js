const express = require('express')
const router = express.Router()

router.use('/contracts/Agent', require('./Agent'))
router.use('/contracts/ResourceManager', require('./ResourceManager'))

module.exports = router