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
	.get('/checkStatus', Agent.checkStatus)
	.post('/initResourceState', Agent.initResourceState)
	.post('/setPrice', Agent.setPrice)
	.post('/setAvailable', Agent.setAvailable)
	.get('/getResourceState', Agent.getResourceState)
	.post('/requestResource', Agent.requestResource)
  .get('/getRequest', Agent.getRequest)
  .post('/responseResource', Agent.responseResource)
  .post('/fetchResponse', Agent.fetchResponse);

module.exports = router