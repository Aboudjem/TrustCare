const ethers = require("ethers");

const TrustCare = require("../../build/contracts/TrustCare.json");
const {connectAt} = require("../utils/utils");

async function deployTrustCare(
  doctorsRegistry,
  healthInsuranceRegistry,
  patientsRegistry,
  signer,
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

async function connectTrustCare(contractAddress, caller) {
  return await connectAt(
      contractAddress,
      TrustCare.abi,
      caller
  );
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
  isValidator,
  newTransaction,
  updateTransactionStatus,
  connectTrustCare
};
