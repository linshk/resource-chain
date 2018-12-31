const truffleConnection = require('../connection/app.js');
const utils = require('../lib/utils')
const port = process.env.PORT || 3000;
const web3 = require('web3');
const BigNumber = web3.utils.BN;

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

exports.getDeployedAgent = async (req, res) => {
  await truffleConnection.Agent.getDeployedInstance()
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

exports.getRequestsCount = async (req, res) => {
  let sender = req.query.sender;
  let address = req.query.address;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.getRequestsCount.call({from: sender});
  })
  .then((total) => {
    res.json({
      status: true,
        msg: '',
        data: {
          total: total
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

exports.getResourcesCount = async (req, res) => {
  let sender = req.query.sender;
  let address = req.query.address;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.getResourcesCount.call({from: sender});
  })
  .then((total) => {
    res.json({
      status: true,
        msg: '',
        data: {
          total: total
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

exports.getLastPulseTimestamp = async (req, res) => {
  let sender = req.query.sender;
  let address = req.query.address;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.getLastPulseTimestamp.call({from: sender});
  })
  .then((timestamp) => {
    res.json({
      status: true,
        msg: '',
        data: {
          timestamp: timestamp
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

exports.getTimeout = async (req, res) => {
  let sender = req.query.sender;
  let address = req.query.address;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.getTimeout.call({from: sender});
  })
  .then((timeout) => {
    res.json({
      status: true,
        msg: '',
        data: {
          timeout: timeout
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

exports.setTimeout = async (req, res) => {
  // logger.info("**** GET /setUsername ****");
  let sender = req.body.sender;
  let address = req.body.address;
  let timeout = req.body.timeout;
  
  await truffleConnection.Agent.getInstance(address)
  .then((instance) => { 
    instance.setTimeout(timeout, {from: sender})
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
  let sender = req.query.sender;
  let address = req.query.address;

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
  let sender = req.body.sender;
  let address = req.body.address;

  let price = req.body.price;

  let hash = req.body.hash;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.initResourceState(hash, price, {from: sender})
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

exports.setPrice =  async (req, res) => {
  let sender = req.body.sender;
  let address = req.body.address;

  let hash = req.body.hash;
  let price = req.body.price;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.setPrice(hash, price, {from: sender})
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

exports.setAvailable = async (req, res) => {
  let sender = req.body.sender;
  let address = req.body.address;

  let hash = req.body.hash;
  let available = req.body.available;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.setAvailable(hash, price, {from: sender})
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

exports.getResourceState = async (req, res) => {
  let sender = req.query.sender;
  let address = req.query.address;

  let hash = req.query.hash;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.getResourceState.call(hash, {from: sender})
  })
  .then((resourceState) => {
    res.json({
      status: true,
      msg: '',
      data: {
        state: resourceState
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

exports.getResourceStateById = async (req, res) => {
  let sender = req.query.sender;
  let address = req.query.address;

  let id = req.query.id;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.getResourceStateById.call(id, {from: sender})
  })
  .then((resourceState) => {
    res.json({
      status: true,
      msg: '',
      data: {
        state: resourceState
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

exports.requestResource = async (req, res) => {
  let sender = req.body.sender;
  let address = req.body.address;

  let hash = req.body.hash;
  // let host = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
  let host = utils.getIPAddress();

  console.log('host:', host, 'port:', port);

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.requestResource(hash, String(host), port, {from: sender})
  })
  .then(() => {
    res.json({
      status: true,
      msg: '',
      data: {}
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

exports.getRequest = async (req, res) => {
  let sender = req.query.sender;
  let address = req.query.address;

  let id = req.query.id;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.getRequest.call(id, {from: sender})
  })
  .then((request) => {
    res.json({
      status: true,
      msg: '',
      data: {
        request: request
      }
    })
  })
  .catch((err) => {
    res.json({
      status: false,
      msg: err.message,
      data: null
    })
  })
};

exports.responseResource = async (req, res) => {
  let sender = req.body.sender;
  let address = req.body.address;

  let id = req.body.id;
  let success = true;
  let url = 'http://192.168.186.181';
  let token = 'sas87d82hd89ashda';

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.responseResource(id, success, url, token, {from: sender})
  })
  .then(() => {
    res.json({
      status: true,
      msg: '',
      data: {}
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

exports.fetchResponse = async (req, res) => {
  let sender = req.body.sender;
  let address = req.body.address;

  let token = req.body.token;
  let id = req.body.id;

  await truffleConnection.Agent.getInstance(address)
  .then((instance) => {
    return instance.fetchResponse(id, {from: sender})
  })
  .then((response) => {
    res.json({
      status: true,
      msg: '',
      data: {
        response: response
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