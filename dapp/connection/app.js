const contract = require('truffle-contract');
const Web3 = require('web3');
const agent_artifact = require('../build/contracts/Agent.json');
const manager_artifact = require('../build/contracts/ResourceManager.json');
var Agent = contract(agent_artifact);
var ResourceManager = contract(manager_artifact)

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

module.exports.ResourceManager = {
  getInstance: async function(address) {
    var self = this;

    ResourceManager.setProvider(web3.currentProvider);
    return ResourceManager.at(address).then((instance) => {
      return instance;
    }).catch((err) => {
      console.log(err);
      throw err;
    })
  },
  getDeployedInstance: async function() {
    var self = this;

    ResourceManager.setProvider(web3.currentProvider);
    return ResourceManager.deployed().then((instance) => {
      return instance;
    }).catch((err) => {
      console.log(err);
      throw err;
    })
  },
  newResourceManager: async function(sender) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    ResourceManager.setProvider(web3.currentProvider);
    // var agent;
    return ResourceManager.new({from: sender}).then(function(instance) {
      return instance;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  }
}

module.exports.Agent = {
  getInstance: async function(address) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
    return Agent.at(address).then((instance) => {
      return instance;
    }).catch((err) => {
      console.log(err);
      throw err;
    });
  },
  getDeployedInstance: async function() {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
    return Agent.deployed().then((instance) => {
      return instance;
    }).catch((err) => {
      console.log(err);
      throw err;
    });
  },
  start: function(callback) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
    ResourceManager.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
            console.log("There was an error fetching your accounts.");
            return;
        }

        if (accs.length == 0) {
            console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
        }
        self.accounts = accs;
        self.account = self.accounts[0];
        console.log('accs', accs);
        callback(self.accounts);
    });
  },
  newAgent: async function(sender) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
    // var agent;
    return Agent.new({from: sender}).then(function(instance) {
      return instance;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  },
  setUsername: async function(sender, address, params) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);

    return Agent.deployed().then(function(instance) {
      return instance.setUsername(params.name, {from: sender});
    }).then(function(value) {
        return value.valueOf();
    }).catch((err) => {
        console.log(err);
        throw err;
    });
  },
  setAvatar: async function(sender, address, params) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
    return Agent.deployed().then(function(instance) {
      instance.setAvatar(params.avatarHash, {from: sender})
    }).catch((err) => {
      console.log(err);
      throw err;
    });
  },
  setMotto: async function(sender, address, params) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
    return Agent.deployed().then(function(instance) {
      instance.setMotto(params.motto, {from: sender})
    }).then(function(value) {
        return value.valueOf();
    }).catch((err) => {
        console.log(err);
        throw err;
    });
  },
  getProfile: async function(sender, address) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);

    return Agent.deployed().then(function(instance) {
      return instance.getProfile.call({from: sender});
    })
    .then(function(value) {
      return value.valueOf();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  },
  pulse: async function(sender, address) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
    return Agent.deployed().then(function(instance) {
      instance.pulse({from: sender})
    }).then(function(value) {
        return value.valueOf();
    }).catch((err) => {
        console.log(err);
        throw err;
    });
  },
  checkStatus: async function(sender, address, params) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
  },
  initResourceState: async function(sender, address, params) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
  },
  setPrice: async function(sender, address, params) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
  },
  setAvailable: async function(sender, address, params) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
  },
  getResourceState: async function(sender, address, params) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
  },
  requestResource: async function(sender, address, params) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
  },
  getRequest: async function(sender, address, params) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
  },
  responseResource: async function(sender, address, params) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
  },
  fetchResponse: async function(sender, address, params) {
    var self = this;

    // Bootstrap the Agent abstraction for Use.
    Agent.setProvider(web3.currentProvider);
  }
}