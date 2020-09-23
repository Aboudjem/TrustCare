const ethers = require("ethers");

const DoctorsRegistry = require("../../build/contracts/DoctorsRegistry.json");

async function deployDoctorsRegistry(signer) {
  const factory = new ethers.ContractFactory(
    DoctorsRegistry.abi,
    DoctorsRegistry.bytecode,
    signer
  );
  const deploy = await factory.deploy();
  return deploy.deployed();
}

async function registerNewDoctor(userAddress, license, categories, contract) {
  return contract.registerNewDoctor(userAddress, license, categories);
}
async function deleteDoctor(userAddress, contract) {
  return contract.deleteDoctor(userAddress);
}

async function updateDoctor(userAddress, categories, contract) {
  return contract.updateDoctor(userAddress, categories);
}

async function doctorLicense(userAddress, contract) {
  return contract.doctorLicense(userAddress);
}

async function doctorCategories(userAddress, contract) {
  return contract.doctorCategories(userAddress);
}

async function isDoctor(userAddress, contract) {
  return contract.isDoctor(userAddress, contract);
}

async function isAdmin(userAddress, contract) {
  return contract.isAdmin(userAddress, contract);
}

async function addAdmin(userAddress, contract) {
  return contract.addAdmin(userAddress, contract);
}

async function removeAdmin(userAddress, contract) {
  return contract.removeAdmin(userAddress, contract);
}

async function addConsultation(category, patient, prescription, contract) {
  return contract.addConsultation(category, patient, prescription);
}

async function consultationCategory(consultationID, contract) {
  return contract.consultationCategory(consultationID);
}

async function consultationDate(consultationID, contract) {
  return contract.consultationDate(consultationID);
}

async function consultationDoctor(consultationID, contract) {
  return contract.consultationDoctor(consultationID);
}

async function consultationPatient(consultationID, contract) {
  return contract.consultationPatient(consultationID);
}

async function consultationPrescription(consultationID, contract) {
  return contract.consultationPrescription(consultationID);
}

module.exports = {
  deployDoctorsRegistry,
  registerNewDoctor,
  deleteDoctor,
  updateDoctor,
  isDoctor,
  isAdmin,
  doctorLicense,
  doctorCategories,
  addAdmin,
  removeAdmin,
  addConsultation,
  consultationCategory,
  consultationDate,
  consultationDoctor,
  consultationPatient,
  consultationPrescription,
};
