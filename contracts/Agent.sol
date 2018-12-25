pragma solidity ^0.4.22;


// agent for handling request to download resources from owner's local storage
contract Agent {
    // download request
    struct Request {
        string resourceHash;
        address requester;
        uint timestamp;
        string host;
        uint port;
    }
    
    // response to request
    struct Response {
        bool success;
        string url;
        string token;
        uint timestamp;
        bool isFetched;
    }
    
    // state of resource
    struct ResourceState {
        string hash;
        uint price;
        uint count;
        bool available;
        uint lastModified;
    }
    
    // personality info, avatarHash points to an image
    struct Profile {
        string username;
        string avatarHash;
        string motto;
        uint lastModified;
    }
    
    
    address public owner;
    Profile profile;
    
    // total count of requests to resources
    uint public requestsCount;
    
    // total count of owned resources
    uint public resourcesCount;
    
    // timestamp of last valid pulse 
    uint lastPulseTimestamp;
    
    // max duration between two valid pulse
    uint timeout;
    
    // status of owner's client (online/offline)
    bool isOnline;
    
    // mapping index to request
    mapping(uint => Request) requests;
    
    // mapping request index to response
    mapping(uint => Response) responses;
    
    // mapping resource hash to resource state
    mapping(string => ResourceState) states;
    
    // mapping resource index to its hash
    mapping(uint => string) hashes;
    
    // notify requester that owner has been online
    event logUserOnline(address user);
    
    // notify owner that some user is requesting owner's resources 
    event logRequest(address reqTo);
    
    // notify requester that owner has sent a response to the request
    event logResponse(address resTo);
    
    // notify owner that requester has fetched the download url and token
    event logFetch(address fetchFrom);
    
    
    modifier onlyOwner {
        require(msg.sender == owner, "owner-only function");
        _;
    }
    
    constructor() public {
        owner = msg.sender;
        requestsCount = 0;
        resourcesCount = 0;
        timeout = 10000;
        
        
    }
    
    function setUsername(string username) public onlyOwner 
    {
        profile.username = username;
        profile.lastModified = block.timestamp;
    }
    
    function setAvatar(string avatarHash) public onlyOwner 
    {
        // disable old avatar
        states[profile.avatarHash].lastModified = 0;
        
        profile.avatarHash = avatarHash;
        profile.lastModified = block.timestamp;
        
        states[avatarHash].lastModified = block.timestamp;
        states[avatarHash].hash = avatarHash;
        states[avatarHash].available = true;
    }
    
    function setMotto(string motto) public onlyOwner 
    {
        profile.motto = motto;
        profile.lastModified = block.timestamp;
    }
    
    function getProfile() public view returns(string username, string avatarHash, string motto, uint lastModified) {
        return (profile.username, profile.avatarHash, profile.motto, profile.lastModified);
    }
    
    // owner of the agent send a pulse when online
    function pulse() public onlyOwner
    {
        lastPulseTimestamp = block.timestamp;
        isOnline = true;
        emit logUserOnline(msg.sender);
    }
    
    // check whether owner of the agent is online
    function checkStatus() public returns (bool status)
    {
        if (isOnline == false || block.timestamp - lastPulseTimestamp > timeout)
        {
            isOnline = false;
            return false;
        }
        return true;
    }
    
    // init state of a resource
    function initResourceState(string hash, uint price) public onlyOwner returns (bool status) {
        // the state info has existed and should not be inited again
        if (states[hash].lastModified != 0) {
            return false;
        }
        states[hash] = ResourceState(hash, price, 0, true, block.timestamp);
        hashes[resourcesCount] = hash;
        resourcesCount++;
        return true;
    }
    
    // set price of a resource
    function setPrice(string hash, uint price) public onlyOwner returns (bool status) {
        // the state info does not exist
        if (states[hash].lastModified == 0) {
            return false;
        }
        states[hash].price = price;
        states[hash].lastModified = block.timestamp;
        return true;
    }
    
    // enable or disable a resource
    function setAvailable(string hash, bool available) public onlyOwner returns (bool status) {
        // the state info does not exist
        if (states[hash].lastModified == 0) {
            return false;
        }
        states[hash].available = available;
        states[hash].lastModified = block.timestamp;
        return true;
    } 
    
    // get state of a resource by resource hash
    function getResourceState(string resourceHash) public view returns(uint price, uint count, bool available, uint timestamp) {
        // state does not exist
        if (states[resourceHash].lastModified == 0) {
            return (0, 0, false, 0);
        }
        return (states[resourceHash].price, states[resourceHash].count, states[resourceHash].available, states[resourceHash].lastModified);
    }
    
    
    // send a request to download the resource from owner's local storage, and wait for response
    function requestResource(string resourceHash, string host, uint port) public
    {
        require(msg.sender != owner, "invalid sender");
        require(states[resourceHash].available, "resource is now not available");
        
        requests[requestsCount] = Request(resourceHash, msg.sender, block.timestamp, host, port);
        requestsCount++;
        emit logRequest(owner);
    }

    
    // get a request by its index
    function getRequest(uint id) public view returns (string resourceHash, address requester, uint timestamp, string host, uint port)
    {
        require(id < requestsCount, "id out of range");
        require(requests[id].requester == msg.sender, "access to the request disallowed");
        return (requests[id].resourceHash, requests[id].requester, requests[id].timestamp, requests[id].host, requests[id].port);
    }
    

    // the owner puts url and token (for downloading the resource from owner) as response message to the request with index of id 
    function responseResource(uint id, bool success, string url, string token) public onlyOwner
    {
        require(id < requestsCount, "id out of range");

        responses[id] = Response(success, url, token, block.timestamp, false);
        emit logResponse(requests[id].requester);
    }
    
    // the requester pays for the resource and fetch response for downloading 
    function fetchResponse(uint id) public payable returns (bool success, string url, string token, uint timestamp)
    {
        require(id < requestsCount, "id out of range");
        require(requests[id].requester == msg.sender, "access to the request disallowed");
        require(responses[id].timestamp != 0, "response does not exist"); 
        
        if (responses[id].success == false) 
        {
            return (false, "", "", 0);
        }
        
        string storage hash = requests[id].resourceHash;
        require(msg.value >= states[hash].price, "you should pay at least the price of the resource");
        owner.transfer(msg.value);
        
        states[hash].count++;
        responses[id].isFetched = true;
        emit logFetch(owner);
        return (true, responses[id].url, responses[id].token, responses[id].timestamp);
    }

}    