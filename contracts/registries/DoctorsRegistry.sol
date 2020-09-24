pragma solidity 0.6.2;

import "../app/TrustCare.sol";
import "../roles/AdminRole.sol";

contract DoctorsRegistry is AdminRole {

    event DoctorRegistered (uint license, address doctorAddress, uint[] categories);
    event DoctorDeleted (uint license, address doctorAddress);
    event DoctorUpdated (address doctorAddress, uint[] categories);
    event ConsultationCreated (uint category, uint date, address doctor, address patient, string prescription);
    event TrustCareBound(address trustCare);
    event ConsultationDeleted(bytes32 consultationID);

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
        require (doctorLicense(userAddress) == 0, "doctor already exists");
        Doctor memory newDoctor;
        newDoctor.license = license;
        newDoctor.categories = categories;
        doctors[userAddress] = newDoctor;
        emit DoctorRegistered(license, userAddress, categories);
    }

    function deleteDoctor(address userAddress) external onlyAdmin {
        require (doctorLicense(userAddress) != 0, "doctor does not exist");
        uint license = doctors[userAddress].license;
        delete doctors[userAddress];
        emit DoctorDeleted(license, userAddress);
    }

    function updateDoctor(address userAddress, uint[] calldata categories) external onlyAdmin {
        require (doctorLicense(userAddress) != 0, "doctor does not exist");
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

    function getConsultationID(uint category, uint date, address doctor, address patient, string memory prescription) public view returns (bytes32) {
        return keccak256(abi.encode(category, date, doctor, patient, prescription));
    }

    function addConsultation(uint category, uint date, address patient, string calldata prescription) external onlyDoctor {
        require(isAuthorized(msg.sender,category), "doctor is not allowed for this category");
        address sender = msg.sender;
        bytes32 consultationID = getConsultationID(category, date, sender, patient, prescription);
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

    function deleteConsultation(bytes32 consultationID) external onlyDoctor {
        require (consultationDoctor(consultationID) == msg.sender && trustCare.getTransactionStatus(consultationID) == 1, "permission denied : you don't have the right to remove this consultation");
        trustCare.deleteTransaction(consultationID);
        emit ConsultationDeleted(consultationID);
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
