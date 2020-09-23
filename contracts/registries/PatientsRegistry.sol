pragma solidity 0.6.2;

contract PatientsRegistry {

    event PatientRegistered (hash CNSNumber, address patientAddress, bool isMale, uint ageCategory, uint countryOfResidenceCode, uint countryOfWorkCode,uint invalidityPercentage);
    event PatientDeleted (uint uuid, address patientAddress);
    event PatientUpdated (address doctorAddress, uint[] categories);
    
    
    struct Patient {
        hash CNSNumber;
        bool isMale;
        uint ageCategory; //1= 0-3 yo , 2= 3-18 yo , 3= 18-25 yo, 4=25-60 yo and 5>yo
        uint countryOfResidenceCode;
        uint countryOfWorkCode;
        uint invalidityPercentage;
    }

    mapping (address => Patient) patients;

    function registerNewPatient(address userAddress, hash CNSNumber, bool isMale, uint ageCategory, uint countryOfResidenceCode, uint countryOfWorkCode,uint invalidityPercentage) {
        Patient newPatient;
        newPatient.CNSNumber = CNSNumber;
        newPatient.isMale = isMale;
        newPatient.ageCategory = ageCategory;
        newPatient.countryOfResidenceCode = countryOfResidenceCode;
        newPatient.countryOfWorkCode = countryOfWorkCode;
        newPatient.invalidityPercentage = invalidityPercentage;
        patients[userAddress] = newPatient;
        emit PatientRegistered(CNSNumber, userAddress, isMale, ageCategory, countryOfResidenceCode, countryOfWorkCode, invalidityPercentage);
    }

    function deletePatient(address userAddress) {
        hash CNSNumber = patients[userAddress].CNSNumber;
        delete doctors[userAddress];
        emit DoctorDeleted(CNSNumber, userAddress);
    }

    function updatePatient(address userAddress, uint ageCategory, uint countryOfResidenceCode, uint countryOfWorkCode, uint invalidityPercentage) {
        patients[userAddress].ageCategory = ageCategory;
        patients[userAddress].countryOfResidenceCode = countryOfResidenceCode;
        patients[userAddress].countryOfWorkCode = countryOfWorkCode;
        patients[userAddress].invalidityPercentage = invalidityPercentage;
        emit DoctorDeleted(userAddress, ageCategory, countryOfResidenceCode, countryOfWorkCode, invalidityPercentage);
    }

    function showPatientCNSNumber(address userAddress) public view returns (hash) {
        return patients[userAddress].CNSNumber;
    }

    function showIsMale (address userAddress) public view returns (bool) {
        return patients[userAddress].isMale;
    }

    function showAgeCategory (address userAddress) public view returns (uint) {
        return patients[userAddress].ageCategory;
    }

    function showCountryOfResidenceCode (address userAddress) public view returns (uint) {
        return patients[userAddress].CountryOfResidenceCode;
    }

    function showCountryOfWorkCode (address userAddress) public view returns (uint) {
        return patients[userAddress].countryOfWorkCode;
    }

    function showInvalidityPercentage (address userAddress) public view returns (uint) {
        return patients[userAddress].invalidityPercentage;
    }

}
