pragma solidity 0.6.2;

import "../roles/AdminRole.sol";

contract HealthInsurancesRegistry is AdminRole {
    
    event healthInsuranceRegistered (uint uuid, address patientAddress, uint countryCode);
    event healthInsuranceDeleted (uint uuid, address patientAddress);
    event healthInsuranceUpdated (uint uuid, address patientAddress, uint countryCode);
    
    struct healthInsurance {
        uint uuid;
        uint countryCode;
    }
    mapping (address => healthInsurance) healthInsurances;

    function registerNewHealthInsurance(address userAddress, uint uuid, uint countryCode) public {
        healthInsurance memory newHealthInsurance;
        newHealthInsurance.uuid = uuid;
        newHealthInsurance.countryCode = countryCode;
        healthInsurances[userAddress] = newHealthInsurance;
        emit healthInsuranceRegistered(uuid, userAddress, countryCode);
    }

    function deleteHealthInsurance(address userAddress) public {
        delete healthInsurances[userAddress];
        emit healthInsuranceDeleted(healthInsurances[userAddress].uuid, userAddress);
    }

    function updateHealthInsurance (address userAddress,uint uuid, uint countryCode) public {
        healthInsurances[userAddress].uuid = uuid;
        healthInsurances[userAddress].countryCode = countryCode;
        emit healthInsuranceUpdated(uuid, userAddress, countryCode);
    }

    function showHealthInsuranceUUID(address userAddress) public view returns (uint) {
        return healthInsurances[userAddress].uuid;
    }

    function showHealthInsuranceCountryCode(address userAddress) public view returns (uint) {
        return healthInsurances[userAddress].countryCode;
    }
}
