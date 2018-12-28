const express = require('express')
const router = express.Router()
const Agent = require('../controller/Agent')

router
	.post('/newAgent', Agent.newAgent)
	.post('/setUsername', Agent.setUsername)
	.post('/setAvatar', Agent.setAvatar)
	.post('/setMotto', Agent.setMotto)
	.get('/getProfile', Agent.getProfile)
	.post('/pulse', Agent.pulse)
	.get('/checkStatus', Agent.checkStatus);

module.exports = router