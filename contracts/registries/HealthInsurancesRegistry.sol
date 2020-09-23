pragma solidity 0.6.2;

import "../roles/AdminRole.sol";
import "./PatientsRegistry.sol";
import "./DoctorsRegistry.sol";

contract HealthInsurancesRegistry is AdminRole {
    
    event healthInsuranceRegistered (uint uuid, address healthInsurance, uint countryCode);
    event healthInsuranceDeleted (uint uuid, address healthInsurance);
    event healthInsuranceUpdated (uint uuid, address healthInsurance, uint countryCode);
    event TransactionApproved (bytes32 transactionID, address healthInsurance);
    
    struct HealthInsurance {
        uint uuid;
        uint countryCode;
    }

    TrustCare trustCare;
    DoctorsRegistry doctorsRegistry;
    PatientsRegistry patientsRegistry;

    mapping (address => HealthInsurance) healthInsurances;

    function registerNewHealthInsurance(address userAddress, uint uuid, uint countryCode) public onlyAdmin {
        HealthInsurance memory newHealthInsurance;
        newHealthInsurance.uuid = uuid;
        newHealthInsurance.countryCode = countryCode;
        healthInsurances[userAddress] = newHealthInsurance;
        emit healthInsuranceRegistered(uuid, userAddress, countryCode);
    }

    function deleteHealthInsurance(address userAddress) public onlyAdmin {
        delete healthInsurances[userAddress];
        emit healthInsuranceDeleted(healthInsurances[userAddress].uuid, userAddress);
    }

    function updateHealthInsurance (address userAddress,uint uuid, uint countryCode) public onlyAdmin {
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

    function approveTransaction(bytes32 transactionID) external {
        address patient = doctorsRegistry.consultationPatient(transactionID);
        address patientInsurance = patientsRegistry.showHealthInsurance(patient);
        require (msg.sender == patientInsurance, "permission denied : caller is not the valid insurance for this transaction");
        if (trustCare.getTransactionStatus(transactionID) == 2) {
            trustCare.updateTransactionStatus(transactionID, 3);
            emit TransactionApproved (transactionID, msg.sender);
        }
        else  {
            revert("transaction not valid");
        }
    }
}
