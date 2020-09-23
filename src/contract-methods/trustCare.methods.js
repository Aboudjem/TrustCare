const ethers = require("ethers");

const TrustCare = require("../../build/contracts/TrustCare.json");

async function deployTrustCare(
  signer,
  doctorsRegistry,
  healthInsuranceRegistry,
  patientsRegistry
) {
  const factory = new ethers.ContractFactory(
    TrustCare.abi,
    TrustCare.bytecode,
    signer
  );
  const deploy = await factory.deploy(
    doctorsRegistry,
    healthInsuranceRegistry,
    patientsRegistry
  );
  return deploy.deployed();
}

async function isDoctor(userAddress, contract) {
  return contract.isDoctor(userAddress);
}
async function isValidator(userAddress, contract) {
  return contract.isValidator(userAddress);
}

async function newTransaction(transactionID, contract) {
  return contract.newTransaction(transactionID);
}

async function updateTransactionStatus(transactionID, status, contract) {
  return contract.updateTransactionStatus(transactionID, status, contract);
}

module.exports = {
  deployTrustCare,
  isDoctor,
  isValidator,
  newTransaction,
  updateTransactionStatus,
};
