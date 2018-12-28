pragma solidity ^0.4.22;


// resource manager manages resources info that are uploaded to the platform
contract ResourceManager {
    // resource detail
    struct ResourceInfo {
        address owner;
        uint timestamp;
        string name;
        uint size;
        string description;
        string tags;
        address agent;
    }
    
    // mapping resource hash to its detail
    mapping (string => ResourceInfo) resources;
    
    // mapping user account address to his agent contract address (for request resource)
    mapping (address => address) agents;
    
    // mapping index of resource to its hash
    mapping (uint => string) hashes;
    
    // total count of resources
    uint public resourcesCount;
    
    // notify all users that new resources info are uploaded
    event logResourceUpload();
    
    // notify that an user has registered his agent contract  
    event logRegisterAgent(address owner, address agent);
    
    constructor() public {
        resourcesCount = 0; 
    }

    function uploadResourceInfo(string hash, string name, uint size, string description, string tags) public returns (bool status)
    {
        if (resources[hash].timestamp == 0) 
        {
            // validate something here
            resources[hash] = ResourceInfo(msg.sender, block.timestamp, name, size, description, tags, agents[msg.sender]);
            hashes[resourcesCount] = hash;
            resourcesCount = resourcesCount + 1;
            emit logResourceUpload();
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function getResourceInfoByHash(string resourceHash) public view returns (address owner, uint timestamp, string name, uint size, string description, string tags, address agent)  
    {
        require(resources[resourceHash].timestamp != 0, "resource does not exist");
        return (resources[resourceHash].owner, resources[resourceHash].timestamp, resources[resourceHash].name, resources[resourceHash].size, resources[resourceHash].description, resources[resourceHash].tags, resources[resourceHash].agent);
    }
    
    function getResourceInfoById(uint id) public view returns (address owner, uint timestamp, string name, uint size, string description, string tags, address agent) 
    {
        require(id < resourcesCount, "id out of range");
        string storage hash = hashes[id];
        return (resources[hash].owner, resources[hash].timestamp, resources[hash].name, resources[hash].size, resources[hash].description, resources[hash].tags, resources[hash].agent);
    }
    
    
    function registerAgent(address agent) public returns (bool status) {
        if (agent != address(0)) {
            agents[msg.sender] = agent;
            emit logRegisterAgent(msg.sender, agent);
            return true;
        }
        return false;
    }
    
    
}    
