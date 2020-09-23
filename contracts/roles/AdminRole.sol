pragma solidity 0.6.2;

import "./Ownable.sol";

contract AdminRole is Ownable {

    event AdminCreated(address admin);
    event AdminRemoved(address admin);

    mapping (address => bool) admins;

    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "error : this address is not registered as admin");
        _;
    }

    function isAdmin(address userAddress) public view returns (bool) {
        return admins[userAddress];
    }

    function addAdmin(address admin) external onlyOwner {
        require(!admins[admin], "admin already exists");
        admins[admin] = true;
        emit AdminCreated(admin);
    }

    function removeAdmin (address admin) external onlyOwner {
        require(admins[admin], "admin already exists");
        admins[admin] = false;
        emit AdminRemoved(admin);
    }
}
