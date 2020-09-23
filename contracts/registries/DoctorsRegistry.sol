pragma solidity 0.6.2;

import "../app/TrustCare.sol";
import "../app/TrustCare.sol";

contract DoctorsRegistry {

    event DoctorRegistered (uint license, address doctorAddress, uint[] categories);
    event DoctorDeleted (uint license, address doctorAddress);
    event DoctorUpdated (address doctorAddress, uint[] categories);
    event ConsultationCreated (uint category, uint date, address doctor, address patient, string prescription);

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

    function registerNewDoctor(address userAddress, uint license, uint[] categories) {
        Doctor newDoctor;
        newDoctor.license = license;
        newDoctor.categories = categories;
        doctors[userAddress] = newDoctor;
        emit DoctorRegistered(license, userAddress, categories);
    }

    function deleteDoctor(address userAddress) {
        uint license = doctors[userAddress].license;
        delete doctors[userAddress];
        emit DoctorDeleted(license, userAddress);
    }

    function updateDoctor(address userAddress, uint[] categories) {
        doctors[userAddress].categories = categories;
        emit DoctorDeleted(userAddress, categories);
    }

    function doctor(address userAddress) {
        return doctors[userAddress];
    }
    function addConsultation(uint category, address patient, string prescription) {
        uint date = now;
        address doctor = msg.sender;
        bytes32 consultationID = keccak256(abi.encode(category, date, doctor, patient, prescription));
        Consultation newConsultation;
        newConsultation.category = category;
        newConsultation.date = date;
        newConsultation.doctor = doctor;
        newConsultation.patient = patient;
        newConsultation.prescription = prescription;
        trustCare.newTransaction(consultationID);
        consultations[consultationID] = newConsultation;
        emit ConsultationCreated (category, date, doctor, patient, prescription);
    }
    function consultation(bytes32 consultationID) {
        return consultations[consultationID];
    }

}
