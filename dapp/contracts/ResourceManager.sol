pragma solidity ^0.4.22;


// resource manager manages resources info that are uploaded to the platform
contract ResourceManager {
    // resource detail
    struct ResourceInfo {
        uint id;
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
            resources[hash] = ResourceInfo(resourcesCount, msg.sender, block.timestamp, name, size, description, tags, agents[msg.sender]);
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

    function getResourcesCount() public view returns (uint count)
    {
        return resourcesCount;
    }
    
    function getResourceInfoByHash(string hash) public view returns (uint id, uint timestamp, string name, uint size, string description, string tags, address agent)  
    {
        require(resources[hash].timestamp != 0, "resource does not exist");
        id = resources[hash].id;
        timestamp = resources[hash].timestamp;
        return (id, timestamp, resources[hash].name, resources[hash].size, resources[hash].description, resources[hash].tags, resources[hash].agent);
    }
    
    function getResourceInfoById(uint id) public view returns (string hash, address owner, uint timestamp, string name, uint size, string description, string tags, address agent) 
    {
        require(id < resourcesCount, "id out of range");
        hash = hashes[id];
        owner = resources[hash].owner;
        return (hash, owner, resources[hash].timestamp, resources[hash].name, resources[hash].size, resources[hash].description, resources[hash].tags, resources[hash].agent);
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
