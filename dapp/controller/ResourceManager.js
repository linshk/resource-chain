const truffleConnection = require('../connection/app.js');
const web3 = require('web3');
const BigNumber = web3.utils.BN;
const crypto = require('crypto');
const fs = require('fs');

exports.newResourceManager = async (req, res) => {
  // logger.info('POST newAgent');
  let sender = req.body.sender;
  await truffleConnection.ResourceManager.newResourceManager(sender)
  .then((tx) => {
    res.json({
      status: true,
      msg: '',
      data: {
        address: tx.address,
        txhash: tx.transactionHash
      }
    });
  })
  .catch((err) => {
    res.json({
      status: false,
      msg: err.message,
      data: null
    })
  });
  
};

exports.uploadResourceInfo = async (req, res) => {
	let sender = req.body.sender;
	let address = req.body.address;

  let file = req.body.file || req.body.resource || req.file;
  console.log(req.file);
  console.log(req.body);
	let name = req.body.name;
	let size = new BigNumber(file.size, 10);
  console.log('size:', size);
	let description = req.body.description;
	let tags = req.body.tags;

  // 读取一个Buffer
  let buffer = fs.readFileSync(file.path);
  let fsHash = crypto.createHash('sha1');
  fsHash.update(buffer);
  let hash = fsHash.digest('hex');
  console.log('hash:', hash);

	await truffleConnection.ResourceManager.getInstance(address)
  .then((instance) => {
    return instance.uploadResourceInfo(hash, name, size, description, tags, {from: sender})
  })
  .then((status) => {
    res.json({
      status: true,
      msg: '',
      data: {
        status: status,
        hash: hash
      }
    })
  })
  .catch((err) => {
    console.log(err)
    res.json({
      status: false,
      msg: err.message,
      data: null
    })
  });
};

exports.getResourceInfoByHash = async (req, res) => {
  let sender = req.query.sender;
  let address = req.query.address;

  let hash = req.query.hash;

  await truffleConnection.ResourceManager.getInstance(address)
  .then((instance) => {
    return instance.getResourceInfoByHash.call(hash, {from: sender})
  })
  .then((resourceInfo) => {
    res.json({
      status: true,
      msg: '',
      data: {
        resourceInfo: resourceInfo
      }
    })
  })
  .catch((err) => {
    res.json({
      status: false,
      msg: err.message,
      data: null
    })
  });
};

exports.getResourceInfoById = async (req, res) => {
  let sender = req.query.sender;
  let address = req.query.address;

  let id = req.query.id;

  await truffleConnection.ResourceManager.getInstance(address)
  .then((instance) => {
    return instance.getResourceInfoById.call(id, {from: sender})
  })
  .then((resourceInfo) => {
    res.json({
      status: true,
      msg: '',
      data: {
        resourceInfo: resourceInfo
      }
    })
  })
  .catch((err) => {
    res.json({
      status: false,
      msg: err.message,
      data: null
    })
  });
};

exports.registerAgent = async (req, res) => {
  let sender = req.body.sender;
  let address = req.body.address;

  let agent = req.body.agent;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.registerAgent(agent, {from: sender})
  })
  .then((status) => {
    res.json({
      status: true,
      msg: '',
      data: {
        status: status
      }
    })
  })
  .catch((err) => {
    res.json({
      status: false,
      msg: err.message,
      data: null
    })
  });
};
