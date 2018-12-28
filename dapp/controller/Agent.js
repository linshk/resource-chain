const truffleConnection = require('../connection/app.js');

exports.newAgent = async (req, res) => {
  // logger.info('POST newAgent');
  let sender = req.body.sender;
  await truffleConnection.Agent.newAgent(sender)
  .then((agent) => {
    res.json({
      status: true,
      msg: '',
      data: {
        address: agent.address,
        txhash: agent.transactionHash
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

exports.setUsername = async (req, res) => {
  // logger.info("**** GET /setUsername ****");
  let sender = req.body.sender;
  let address = req.body.address;
  let name = req.body.name;
  
  await truffleConnection.Agent.getInstance(address)
  .then((instance) => { 
    instance.setUsername(name, {from: sender})
    res.json({
      status: true,
      msg: '',
      data: null
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

exports.setAvatar = async (req, res) => {
  // load file
};


exports.setMotto = async (req, res) => {
  let sender = req.body.sender;
  let address = req.body.address;
  let motto = req.body.motto;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => { 
    instance.setMotto(motto, {from: sender})
    res.json({
      status: true,
      msg: '',
      data: null
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

exports.getProfile = async (req, res) => {
  // logger.info("**** GET /getProfile ****");
  // console.log(req.body);
  let sender = req.query.sender;
  let address = req.query.address;
  // get contract instance and call
  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.getProfile.call({from: sender});
  })
  .then((profile) => {
    res.json({
      status: true,
        msg: '',
        data: {
          profile: profile
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

exports.pulse = async (req, res) => {
  let sender = req.body.sender;
  let address = req.body.address;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => { 
    instance.pulse({from: sender});
    res.json({
      status: true,
      msg: '',
      data: null
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

exports.checkStatus = async (req, res) => {
  let sender = req.body.sender;
  let address = req.body.address;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => { 
    return instance.checkStatus.call({from: sender})
  })
  .then((status) => {
    res.json({
      status: true,
      msg: '',
      data: {
        status: status
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

exports.initResourceState = async (req, res) => {

};

exports.setPrice =  async (req, res) => {

};

exports.setAvailable = async (req, res) => {

};

exports.getResourceState = async (req, res) => {

};

exports.requestResource = async (req, res) => {

};

exports.getRequest = async (req, res) => {

};

exports.responseResource = async (req, res) => {

};

exports.fetchResponse = async (req, res) => {

};