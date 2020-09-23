const ethers = require("ethers");

const DoctorsRegistry = require("../../build/contracts/DoctorRegistry.json");

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

async function doctor(userAddress, contract) {
  return contract.doctor(userAddress, contract);
}

async function addConsultation(category, patient, prescription, contract) {
  return contract.addConsultation(category, patient, prescription);
}

async function consultation(consultationID, contract) {
  return contract.consultation(consultationID);
}

module.exports = {
  deployDoctorsRegistry,
  registerNewDoctor,
  deleteDoctor,
  updateDoctor,
  doctor,
  addConsultation,
  consultation,
};
