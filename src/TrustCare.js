import {
    addAdmin,
    addConsultation,
    consultationCategory,
    consultationDate,
    consultationDoctor,
    consultationPatient,
    consultationPrescription,
    deleteDoctor,
    deployDoctorsRegistry,
    doctorCategories,
    doctorLicense,
    isAdmin,
    registerNewDoctor,
    removeAdmin,
    updateDoctor
} from "./contract-methods/doctorsRegistry.methods";
import {
    deployTrustCare,
    isDoctor,
    isValidator,
    newTransaction,
    updateTransactionStatus
} from "./contract-methods/trustCare.methods";
import {
    approveTransaction, deletePatient,
    deployPatientsRegistry, registerNewPatient, showAgeCategory, showCountryOfResidenceCode, showCountryOfWorkCode,
    showInvalidityPercentage, showIsMale, showPatientCNSNumber, updatePatient
} from "./contract-methods/patientsRegistry.methods";
import {
    deleteHealthInsurance, deployHealthInsurancesRegistry,
    registerNewHealthInsurance, showHealthInsuranceCountryCode, showHealthInsuranceUUID,
    updateHealthInsurance
} from "./contract-methods/healthInsurancesRegistry.methods";

const { BigNumber } = require("ethers/utils");

const { connectAt, requireSigner } = require("../utils/utils");


class TrustCare {

    doctorsRegistryInstance;
    patientsRegistryInstance;
    trustCareInstance;
    healthInsuranceInstance;

  constructor(caller) {
    this.caller = caller;
  }

  static async deployFullTrustCare(signer) {
    await requireSigner(signer);
    const DoctorsRegistry = await deployDoctorsRegistry(signer);
    return new TrustCare(DoctorsRegistry, signer);
  }

    static async at(contractAddress, caller) {
        const trustCareInstance = await connectAt(
            contractAddress,
            TrustCare.abi,
            caller
        );
        return new TrustCare(trustCareInstance, caller);
    }

    async deployDoctorsRegistry(signer) {
        await requireSigner(signer);
        this.doctorsRegistryInstance = await deployDoctorsRegistry(signer);
    }

    async deployPatientsRegistry(signer) {
        await requireSigner(signer);
        this.patientsRegistryInstance = await deployPatientsRegistry(signer);
    }

    async deployTrustCare(signer) {
        await requireSigner(signer);
        this.trustCareInstance = await deployTrustCare(signer);
    }

    async deployHealthInsurancesRegistry(signer) {
        await requireSigner(signer);
        this.healthInsuranceInstance = await deployHealthInsurancesRegistry(signer);
    }

    async isDoctor(userAddress) {
        await requireSigner(this.caller);
        return isDoctor(userAddress, this.trustCareInstance);
    }

    async isValidator(userAddress) {
        await requireSigner(this.caller);
        return isValidator(userAddress, this.trustCareInstance);
    }

    async newTransaction(transactionID) {
        await requireSigner(this.caller);
        return newTransaction(transactionID, this.trustCareInstance);
    }

    async updateTransactionStatus(transactionID, status) {
        await requireSigner(this.caller);
        return updateTransactionStatus(transactionID, status, this.trustCareInstance);
    }

    /// DOCTORS

    async registerNewDoctor(userAddress, license, categories) {
    await requireSigner(this.caller);
    return registerNewDoctor(userAddress, license, categories, this.doctorsRegistryInstance)
  }

    async deleteDoctor(userAddress) {
        await requireSigner(this.caller);
        return deleteDoctor(userAddress, this.doctorsRegistryInstance)
    }

    async updateDoctor(userAddress, categories) {
        await requireSigner(this.caller);
        return updateDoctor(userAddress, categories, this.doctorsRegistryInstance)
    }

    async isDoctor(userAddress) {
        await requireSigner(this.caller);
        return isDoctor(userAddress, this.doctorsRegistryInstance)
    }

    async doctorLicense(userAddress) {
        await requireSigner(this.caller);
        return doctorLicense(userAddress, this.doctorsRegistryInstance)
    }

    async doctorCategories(userAddress) {
        await requireSigner(this.caller);
        return doctorCategories(userAddress, this.doctorsRegistryInstance)
    }

    async isAdmin(userAddress) {
        await requireSigner(this.caller);
        return isAdmin(userAddress, this.doctorsRegistryInstance)
    }

    async addAdmin(userAddress) {
        await requireSigner(this.caller);
        return addAdmin(userAddress, this.doctorsRegistryInstance)
    }

    async removeAdmin(userAddress) {
        await requireSigner(this.caller);
        return removeAdmin(userAddress, this.doctorsRegistryInstance)
    }

    async addConsultation(category, patient, prescription) {
        await requireSigner(this.caller);
        return addConsultation(category, patient, prescription, this.doctorsRegistryInstance)
    }

    async consultationCategory(category, patient, prescription) {
        await requireSigner(this.caller);
        return consultationCategory(category, patient, prescription, this.doctorsRegistryInstance)
    }

    async consultationDate(category, patient, prescription) {
        await requireSigner(this.caller);
        return consultationDate(category, patient, prescription, this.doctorsRegistryInstance)
    }

    async consultationDoctor(category, patient, prescription) {
        await requireSigner(this.caller);
        return consultationDoctor(category, patient, prescription, this.doctorsRegistryInstance)
    }

    async consultationPatient(category, patient, prescription) {
        await requireSigner(this.caller);
        return consultationPatient(category, patient, prescription, this.doctorsRegistryInstance)
    }

    async consultationPrescription(category, patient, prescription) {
        await requireSigner(this.caller);
        return consultationPrescription(category, patient, prescription, this.doctorsRegistryInstance)
    }

    /// PATIENTS

    async registerNewPatient(userAddress, CNSNumber, isMale, ageCategory, countryOfResidenceCode, countryOfWorkCode, invalidityPercentage) {
        await requireSigner(this.caller);
        return registerNewPatient(userAddress, CNSNumber, isMale, ageCategory, countryOfResidenceCode, countryOfWorkCode, invalidityPercentage, this.patientsRegistryInstance)
    }

    async deletePatient(userAddress) {
        await requireSigner(this.caller);
        return deletePatient(userAddress, this.patientsRegistryInstance)
    }

    async updatePatient(userAddress, ageCategory, countryOfResidenceCode, countryOfWorkCode, invalidityPercentage) {
        await requireSigner(this.caller);
        return updatePatient(userAddress, ageCategory, countryOfResidenceCode, countryOfWorkCode, invalidityPercentage, this.patientsRegistryInstance)
    }

    async showPatientCNSNumber(userAddress) {
        await requireSigner(this.caller);
        return showPatientCNSNumber(userAddress, this.patientsRegistryInstance)
    }

    async showIsMale(userAddress) {
        await requireSigner(this.caller);
        return showIsMale(userAddress, this.patientsRegistryInstance)
    }

    async showAgeCategory(userAddress) {
        await requireSigner(this.caller);
        return showAgeCategory(userAddress, this.patientsRegistryInstance)
    }

    async showCountryOfResidenceCode(userAddress) {
        await requireSigner(this.caller);
        return showCountryOfResidenceCode(userAddress, this.patientsRegistryInstance)
    }

    async showCountryOfWorkCode(userAddress) {
        await requireSigner(this.caller);
        return showCountryOfWorkCode(userAddress, this.patientsRegistryInstance)
    }

    async showInvalidityPercentage(userAddress) {
        await requireSigner(this.caller);
        return showInvalidityPercentage(userAddress, this.patientsRegistryInstance)
    }

    async approveTransaction(userAddress) {
        await requireSigner(this.caller);
        return approveTransaction(userAddress, this.patientsRegistryInstance)
    }

    /// HEALTHINSURANCES

    async registerNewHealthInsurance(userAddress, uuid, countryCode) {
        await requireSigner(this.caller);
        return registerNewHealthInsurance(userAddress, uuid, countryCode, this.healthInsuranceInstance)
    }

    async deleteHealthInsurance(userAddress) {
        await requireSigner(this.caller);
        return deleteHealthInsurance(userAddress, this.healthInsuranceInstance)
    }

    async updateHealthInsurance(userAddress, uuid, countryCode) {
        await requireSigner(this.caller);
        return updateHealthInsurance(userAddress, uuid, countryCode, this.healthInsuranceInstance)
    }

    async showHealthInsuranceUUID(userAddress) {
        await requireSigner(this.caller);
        return showHealthInsuranceUUID(userAddress, this.healthInsuranceInstance);
    }

    async showHealthInsuranceCountryCode(userAddress) {
        await requireSigner(this.caller);
        return showHealthInsuranceCountryCode(userAddress, this.healthInsuranceInstance);
    }


}

module.exports = TrustCare;
