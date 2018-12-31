const express = require('express')
const router = express.Router()
const manager = require('../controller/ResourceManager')
const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../resources/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + req.body.name)
  }
});
 
var upload = multer({ storage: storage })
router
  .post('/newResourceManager', manager.newResourceManager)
  .get('/getDeployedManager', manager.getDeployedManager)
  .post('/uploadResourceInfo', upload.single('resource'), manager.uploadResourceInfo)
  .get('/getResourceInfoByHash', manager.getResourceInfoByHash)
  .get('/getResourceInfoById', manager.getResourceInfoById)
  .post('/registerAgent', manager.registerAgent)
  .get('/getResourcesCount', manager.getResourcesCount);

module.exports = router