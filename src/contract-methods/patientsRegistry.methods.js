const ethers = require("ethers");

const PatientsRegistry = require("../../build/contracts/PatientsRegistry.json");
const {connectAt} = require("../utils/utils");

async function deployPatientsRegistry(signer) {
  const factory = new ethers.ContractFactory(
    PatientsRegistry.abi,
    PatientsRegistry.bytecode,
    signer
  );
  const deploy = await factory.deploy();
  return deploy.deployed();
}

async function connectPatientsRegistry(contractAddress, caller) {
  return await connectAt(
      contractAddress,
      PatientsRegistry.abi,
      caller
  );
}

async function registerNewPatient(
  userAddress,
  CNSNumber,
  isMale,
  ageCategory,
  countryOfResidenceCode,
  countryOfWorkCode,
  invalidityPercentage,
  healthInsurance,
  contract
) {
  return contract.registerNewPatient(
    userAddress,
    CNSNumber,
    isMale,
    ageCategory,
    countryOfResidenceCode,
    countryOfWorkCode,
    invalidityPercentage,
  healthInsurance
  );
}

async function deletePatient(userAddress, contract) {
  return contract.deletePatient(userAddress);
}

async function updatePatient(
  userAddress,
  ageCategory,
  countryOfResidenceCode,
  countryOfWorkCode,
  invalidityPercentage,
  contract
) {
  return contract.updatePatient(
    userAddress,
    ageCategory,
    countryOfResidenceCode,
    countryOfWorkCode,
    invalidityPercentage
  );
}

async function showPatientCNSNumber(userAddress, contract) {
  return contract.showPatientCNSNumber(userAddress);
}

async function showIsMale(userAddress, contract) {
  return contract.showIsMale(userAddress);
}

async function showAgeCategory(userAddress, contract) {
  return contract.showAgeCategory(userAddress);
}

async function showCountryOfResidenceCode(userAddress, contract) {
  return contract.showCountryOfResidenceCode(userAddress);
}

async function showCountryOfWorkCode(userAddress, contract) {
  return contract.showCountryOfWorkCode(userAddress);
}

async function showInvalidityPercentage(userAddress, contract) {
  return contract.showInvalidityPercentage(userAddress);
}

async function showHealthInsurance(userAddress, contract) {
  return contract.showHealthInsurance(userAddress);
}


async function approveTransaction(
  category,
  date,
  doctor,
  prescription,
  contract
) {
  return contract.approveTransaction(
    category,
    date,
    doctor,
    prescription
  );
}

module.exports = {
  deployPatientsRegistry,
  registerNewPatient,
  deletePatient,
  updatePatient,
  showPatientCNSNumber,
  showIsMale,
  showAgeCategory,
  showCountryOfResidenceCode,
  showCountryOfWorkCode,
  showInvalidityPercentage,
  showHealthInsurance,
  approveTransaction,
  connectPatientsRegistry
};
