var Migrations = artifacts.require("./Migrations.sol");
var ResourceManager = artifacts.require("./ResourceManager.sol")
var Agent = artifacts.require("./Agent.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(ResourceManager);
  deployer.deploy(Agent);
};
