pragma solidity 0.6.2;

import "../app/TrustCare.sol";
import "../roles/AdminRole.sol";

contract DoctorsRegistry is AdminRole {

    event DoctorRegistered (uint license, address doctorAddress, uint[] categories);
    event DoctorDeleted (uint license, address doctorAddress);
    event DoctorUpdated (address doctorAddress, uint[] categories);
    event ConsultationCreated (uint category, uint date, address doctor, address patient, string prescription);
    event TrustCareBound(address trustCare);

    TrustCare trustCare;

    struct Consultation {
        uint category;
        uint date;
        address doctor;
        address patient;
        string prescription;
    }

    struct Doctor {
        uint license;
        uint[] categories;
    }

    mapping (address => Doctor) doctors;
    mapping (bytes32 => Consultation) consultations;

    modifier onlyDoctor() {
        require(isDoctor(msg.sender), "error : this address is not registered as doctor");
        _;
    }

    function bindToTrustCare (address trustCareAddress) public onlyOwner {
        trustCare = TrustCare(trustCareAddress);
        emit TrustCareBound (trustCareAddress);
    }

    function isDoctor(address userAddress) public view returns (bool) {
        if (doctors[userAddress].license != 0) {
            return true;
        }
        return false;
    }

    function registerNewDoctor(address userAddress, uint license, uint[] calldata categories) external onlyAdmin {
        Doctor memory newDoctor;
        newDoctor.license = license;
        newDoctor.categories = categories;
        doctors[userAddress] = newDoctor;
        emit DoctorRegistered(license, userAddress, categories);
    }

    function deleteDoctor(address userAddress) external onlyAdmin {
        uint license = doctors[userAddress].license;
        delete doctors[userAddress];
        emit DoctorDeleted(license, userAddress);
    }

    function updateDoctor(address userAddress, uint[] calldata categories) external onlyAdmin {
        doctors[userAddress].categories = categories;
        emit DoctorUpdated(userAddress, categories);
    }

    function doctorLicense(address userAddress) public view returns (uint) {
        return doctors[userAddress].license;
    }

    function doctorCategories(address userAddress) public view returns (uint[] memory) {
        return doctors[userAddress].categories;
    }

    function isAuthorized (address doctor, uint category) public view returns (bool) {
        uint[] memory categories = doctors[doctor].categories;
        uint length = categories.length;
        for (uint i = 0; i < length; i++) {
            if (categories[i] == category) {
                return true;
            }
        }
        return false;
    }

    function addConsultation(uint category, address patient, string calldata prescription) external onlyDoctor {
        require(isAuthorized(msg.sender,category), "doctor is not allowed for this category");
        uint date = now;
        address sender = msg.sender;
        bytes32 consultationID = keccak256(abi.encode(category, date, sender, patient, prescription));
        Consultation memory newConsultation;
        newConsultation.category = category;
        newConsultation.date = date;
        newConsultation.doctor = sender;
        newConsultation.patient = patient;
        newConsultation.prescription = prescription;
        trustCare.newTransaction(consultationID);
        consultations[consultationID] = newConsultation;
        emit ConsultationCreated (category, date, sender, patient, prescription);
    }
    function consultationCategory(bytes32 consultationID) public view returns (uint) {
        return consultations[consultationID].category;
    }

    function consultationDate(bytes32 consultationID) public view returns (uint) {
        return consultations[consultationID].date;
    }

    function consultationDoctor(bytes32 consultationID) public view returns (address) {
        return consultations[consultationID].doctor;
    }

    function consultationPatient(bytes32 consultationID) public view returns (address) {
        return consultations[consultationID].patient;
    }

    function consultationPrescription(bytes32 consultationID) public view returns (string memory) {
        return consultations[consultationID].prescription;
    }
}
