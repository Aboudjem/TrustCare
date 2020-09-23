pragma solidity 0.6.2;

import "../roles/Ownable.sol";

contract TrustCare is Ownable{

    event TransactionCreated(bytes32 transactionID);
    event StatusUpdated(bytes32 transactionID, uint status);
    event TrustCareCreated(address doctorsRegistry, address healthInsuranceRegistry, address patientsRegistry);

    mapping (bytes32 => uint) transactionStatus;

    struct Registries{
        address doctorsRegistry;
        address healthInsuranceRegistry;
        address patientsRegistry;
    }

    Registries registries;

    modifier onlyDoctor() {
        require(isDoctor(msg.sender), "error : this address is not registered as doctor contract");
        _;
    }

    modifier onlyValidator() {
        require(isValidator(msg.sender), "error : this address is not registered as validator");
        _;
    }


    constructor (address doctorsRegistry, address healthInsuranceRegistry, address patientsRegistry) public {
        registries.doctorsRegistry = doctorsRegistry;
        registries.healthInsuranceRegistry = healthInsuranceRegistry;
        registries.patientsRegistry = patientsRegistry;
        emit TrustCareCreated(doctorsRegistry, healthInsuranceRegistry, patientsRegistry);
    }

    function isDoctor(address userAddress) public view returns (bool) {
        if (userAddress != registries.doctorsRegistry) {
            return false;
        }
        return true;
    }

    function isValidator(address userAddress) public view returns (bool) {
        if (userAddress != registries.healthInsuranceRegistry && userAddress != registries.patientsRegistry) {
            return false;
        }
        return true;
    }

    function newTransaction (bytes32 transactionID) external onlyDoctor {
        transactionStatus[transactionID] = 1;
        emit TransactionCreated(transactionID);
    }

    function updateTransactionStatus(bytes32 transactionID, uint status) external onlyValidator {
        transactionStatus[transactionID] = status;
        emit StatusUpdated(transactionID, status);
    }

}
