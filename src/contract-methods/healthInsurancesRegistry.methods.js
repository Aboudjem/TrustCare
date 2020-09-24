const ethers = require("ethers");

const HealthInsurancesRegistry = require("../../build/contracts/HealthInsurancesRegistry.json");

async function deployHealthInsurancesRegistry(signer) {
  const factory = new ethers.ContractFactory(
    HealthInsurancesRegistry.abi,
    HealthInsurancesRegistry.bytecode,
    signer
  );
  const deploy = await factory.deploy();
  return deploy.deployed();
}

async function registerNewHealthInsurance(userAddress, uuid, countryCode, contract) {
  return contract.registerNewHealthInsurance(userAddress, uuid, countryCode);
}

async function deleteHealthInsurance(userAddress, contract) {
  return contract.deleteHealthInsurance(userAddress);
}

async function updateHealthInsurance(userAddress, uuid, countryCode, contract) {
  return contract.updateHealthInsurance(userAddress, uuid, countryCode);
}

async function showHealthInsuranceUUID(userAddress, contract) {
  return contract.showHealthInsuranceUUID(userAddress, contract);
}

async function showHealthInsuranceCountryCode(userAddress, contract) {
  return contract.showHealthInsuranceCountryCode(userAddress);
}

module.exports = {
  deployHealthInsurancesRegistry,
  registerNewHealthInsurance,
  deleteHealthInsurance,
  updateHealthInsurance,
  showHealthInsuranceUUID,
  showHealthInsuranceCountryCode,
};
