const ethers = require("ethers");

const PatientsRegistry = require("../../build/contracts/PatientsRegistry.json");

async function deployPatientsRegistry(signer) {
  const factory = new ethers.ContractFactory(
    PatientsRegistry.abi,
    PatientsRegistry.bytecode,
    signer
  );
  const deploy = await factory.deploy();
  return deploy.deployed();
}

async function registerNewPatient(
  userAddress,
  CNSNumber,
  isMale,
  ageCategory,
  countryOfResidenceCode,
  countryOfWorkCode,
  invalidityPercentage,
  contract
) {
  return contract.registerNewPatient(
    userAddress,
    CNSNumber,
    isMale,
    ageCategory,
    countryOfResidenceCode,
    countryOfWorkCode,
    invalidityPercentage
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
  return contract.showPatientCNSNumber(userAddress, contract);
}

async function showIsMale(userAddress, contract) {
  return contract.showIsMale(userAddress, contract);
}

async function showAgeCategory(userAddress, contract) {
  return contract.showAgeCategory(userAddress, contract);
}

async function showCountryOfResidenceCode(userAddress, contract) {
  return contract.showCountryOfResidenceCode(userAddress, contract);
}

async function showCountryOfWorkCode(userAddress, contract) {
  return contract.showCountryOfWorkCode(userAddress, contract);
}

async function showInvalidityPercentage(userAddress, contract) {
  return contract.showInvalidityPercentage(userAddress, contract);
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
    prescription,
    contract
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
  approveTransaction,
};
