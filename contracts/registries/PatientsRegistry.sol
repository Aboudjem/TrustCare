pragma solidity 0.6.2;

import "../app/TrustCare.sol";
import "../roles/AdminRole.sol";
import "./DoctorsRegistry.sol";

contract PatientsRegistry is AdminRole {

    event PatientRegistered (string CNSNumber, address patientAddress, bool isMale, uint ageCategory, uint countryOfResidenceCode, uint countryOfWorkCode,uint invalidityPercentage, address healthInsurance);
    event PatientDeleted (string uuid, address patientAddress);
    event PatientUpdated (address userAddress, uint ageCategory, uint countryOfResidenceCode, uint countryOfWorkCode, uint invalidityPercentage, address healthInsurance);
    event TransactionApproved (bytes32 transactionID, address patient);
    event TrustCareBound(address trustCare);
    event TransactionRejected(bytes32 transactionID);

    TrustCare trustCare;

    struct Patient {
        string CNSNumber;
        bool isMale;
        uint ageCategory; //1= 0-3 yo , 2= 3-18 yo , 3= 18-25 yo, 4=25-60 yo and 5>yo
        uint countryOfResidenceCode;
        uint countryOfWorkCode;
        uint invalidityPercentage;
        address healthInsurance;
    }

    mapping (address => Patient) patients;

    function bindToTrustCare (address trustCareAddress) public onlyOwner {
        trustCare = TrustCare(trustCareAddress);
        emit TrustCareBound (trustCareAddress);
    }

    function registerNewPatient(
        address userAddress,
        string memory CNSNumber,
        bool isMale,
        uint ageCategory,
        uint countryOfResidenceCode,
        uint countryOfWorkCode,
        uint invalidityPercentage,
        address healthInsurance) public onlyAdmin {
        Patient memory newPatient;
        newPatient.CNSNumber = CNSNumber;
        newPatient.isMale = isMale;
        newPatient.ageCategory = ageCategory;
        newPatient.countryOfResidenceCode = countryOfResidenceCode;
        newPatient.countryOfWorkCode = countryOfWorkCode;
        newPatient.invalidityPercentage = invalidityPercentage;
        newPatient.healthInsurance = healthInsurance;
        patients[userAddress] = newPatient;
        emit PatientRegistered(CNSNumber, userAddress, isMale, ageCategory, countryOfResidenceCode, countryOfWorkCode, invalidityPercentage, healthInsurance);
    }

    function deletePatient(address userAddress) public onlyAdmin {
        string memory CNSNumber = patients[userAddress].CNSNumber;
        delete patients[userAddress];
        emit PatientDeleted(CNSNumber, userAddress);
    }

    function updatePatient(address userAddress, uint ageCategory, uint countryOfResidenceCode, uint countryOfWorkCode, uint invalidityPercentage, address healthInsurance) public onlyAdmin {
        patients[userAddress].ageCategory = ageCategory;
        patients[userAddress].countryOfResidenceCode = countryOfResidenceCode;
        patients[userAddress].countryOfWorkCode = countryOfWorkCode;
        patients[userAddress].invalidityPercentage = invalidityPercentage;
        patients[userAddress].healthInsurance = healthInsurance;
        emit PatientUpdated(userAddress, ageCategory, countryOfResidenceCode, countryOfWorkCode, invalidityPercentage, healthInsurance);
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

    function showHealthInsurance (address userAddress) public view returns (address) {
        return patients[userAddress].healthInsurance;
    }

    function approveTransaction(bytes32 transactionID) external {
        DoctorsRegistry doctorsRegistry = DoctorsRegistry(trustCare.showDoctorsRegistry());
        require (msg.sender == doctorsRegistry.consultationPatient(transactionID), "permission denied : caller is not beneficiary of the transaction");
        if (trustCare.getTransactionStatus(transactionID) == 1) {
            trustCare.updateTransactionStatus(transactionID, 2);
            emit TransactionApproved (transactionID, msg.sender);
        }
        else {
            revert("transaction not valid");
        }
    }

    function rejectTransaction(bytes32 transactionID) external  {
        DoctorsRegistry doctorsRegistry = DoctorsRegistry(trustCare.showDoctorsRegistry());
        require (msg.sender == doctorsRegistry.consultationPatient(transactionID), "permission denied : caller is not beneficiary of the transaction");
        require (trustCare.getTransactionStatus(transactionID) == 1 || trustCare.getTransactionStatus(transactionID) == 2, "permission denied : status of transaction doesn't allow deletion anymore");
        trustCare.deleteTransaction(transactionID);
        emit TransactionRejected(transactionID);
    }

}
