pragma solidity 0.6.2;

import "../roles/Ownable.sol";

contract TrustCare is Ownable{

    event TransactionCreated(bytes32 transactionID);
    event StatusUpdated(bytes32 transactionID, uint status);
    event TrustCareUpdated(address doctorsRegistry, address healthInsuranceRegistry, address patientsRegistry);

    mapping (bytes32 => uint) transactionStatus;

    struct Registries{
        address doctorsRegistry;
        address healthInsuranceRegistry;
        address patientsRegistry;
    }

    Registries registries;

    modifier onlyDoctorRegistry() {
        require(isDoctorRegistry(msg.sender), "error : this address is not registered as doctor contract");
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
        emit TrustCareUpdated(doctorsRegistry, healthInsuranceRegistry, patientsRegistry);
    }

    function updateTrustCare(address doctorsRegistry, address healthInsuranceRegistry, address patientsRegistry) public onlyOwner {
        registries.doctorsRegistry = doctorsRegistry;
        registries.healthInsuranceRegistry = healthInsuranceRegistry;
        registries.patientsRegistry = patientsRegistry;
        emit TrustCareUpdated(doctorsRegistry, healthInsuranceRegistry, patientsRegistry);
    }

    function isDoctorRegistry(address userAddress) public view returns (bool) {
        return (userAddress == registries.doctorsRegistry);
    }

    function isValidator(address userAddress) public view returns (bool) {
        return (userAddress == registries.healthInsuranceRegistry || userAddress == registries.patientsRegistry);
    }

    function newTransaction (bytes32 transactionID) external onlyDoctorRegistry {
        transactionStatus[transactionID] = 1;
        emit TransactionCreated(transactionID);
    }

    function updateTransactionStatus(bytes32 transactionID, uint status) external onlyValidator {
        transactionStatus[transactionID] = status;
        emit StatusUpdated(transactionID, status);
    }

    function getTransactionStatus(bytes32 transactionID) external view returns (uint) {
        require(transactionStatus[transactionID] == 1 || transactionStatus[transactionID] == 2 || transactionStatus[transactionID] == 3, "transaction does not exist");
        return transactionStatus[transactionID];
    }

}
