pragma solidity 0.6.2;

import "../app/TrustCare.sol";
import "../roles/Ownable.sol";

contract PatientsRegistry is Ownable {

    event PatientRegistered (string CNSNumber, address patientAddress, bool isMale, uint ageCategory, uint countryOfResidenceCode, uint countryOfWorkCode,uint invalidityPercentage);
    event PatientDeleted (string uuid, address patientAddress);
    event PatientUpdated (address userAddress, uint ageCategory, uint countryOfResidenceCode, uint countryOfWorkCode, uint invalidityPercentage);
    event TransactionApproved (bytes32 transactionID, address patient);

    TrustCare trustCare;

    struct Patient {
        string CNSNumber;
        bool isMale;
        uint ageCategory; //1= 0-3 yo , 2= 3-18 yo , 3= 18-25 yo, 4=25-60 yo and 5>yo
        uint countryOfResidenceCode;
        uint countryOfWorkCode;
        uint invalidityPercentage;
    }

    mapping (address => Patient) patients;

    function registerNewPatient(address userAddress, string memory CNSNumber, bool isMale, uint ageCategory, uint countryOfResidenceCode, uint countryOfWorkCode,uint invalidityPercentage) public {
        Patient memory newPatient;
        newPatient.CNSNumber = CNSNumber;
        newPatient.isMale = isMale;
        newPatient.ageCategory = ageCategory;
        newPatient.countryOfResidenceCode = countryOfResidenceCode;
        newPatient.countryOfWorkCode = countryOfWorkCode;
        newPatient.invalidityPercentage = invalidityPercentage;
        patients[userAddress] = newPatient;
        emit PatientRegistered(CNSNumber, userAddress, isMale, ageCategory, countryOfResidenceCode, countryOfWorkCode, invalidityPercentage);
    }

    function deletePatient(address userAddress) public {
        string memory CNSNumber = patients[userAddress].CNSNumber;
        delete patients[userAddress];
        emit PatientDeleted(CNSNumber, userAddress);
    }

    function updatePatient(address userAddress, uint ageCategory, uint countryOfResidenceCode, uint countryOfWorkCode, uint invalidityPercentage) public {
        patients[userAddress].ageCategory = ageCategory;
        patients[userAddress].countryOfResidenceCode = countryOfResidenceCode;
        patients[userAddress].countryOfWorkCode = countryOfWorkCode;
        patients[userAddress].invalidityPercentage = invalidityPercentage;
        emit PatientUpdated(userAddress, ageCategory, countryOfResidenceCode, countryOfWorkCode, invalidityPercentage);
    }

    function showPatientCNSNumber(address userAddress) public view returns (string memory) {
        return patients[userAddress].CNSNumber;
    }

    function showIsMale (address userAddress) public view returns (bool) {
        return patients[userAddress].isMale;
    }

    function showAgeCategory (address userAddress) public view returns (uint) {
        return patients[userAddress].ageCategory;
    }

    function showCountryOfResidenceCode (address userAddress) public view returns (uint) {
        return patients[userAddress].countryOfResidenceCode;
    }

    function showCountryOfWorkCode (address userAddress) public view returns (uint) {
        return patients[userAddress].countryOfWorkCode;
    }

    function showInvalidityPercentage (address userAddress) public view returns (uint) {
        return patients[userAddress].invalidityPercentage;
    }

    function approveTransaction(uint category, uint date, address doctor, string calldata prescription) external {
        address sender = msg.sender;
        bytes32 transactionID = keccak256(abi.encode(category, date, doctor, sender, prescription));
        if (trustCare.getTransactionStatus(transactionID) == 1) {
            trustCare.updateTransactionStatus(transactionID, 2);
            emit TransactionApproved (transactionID, sender);
        }
        if (trustCare.getTransactionStatus(transactionID) != 1) {
            revert("transaction not valid");
        }
    }

}
