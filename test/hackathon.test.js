const Web3 = require("web3");

require("chai").use(require("chai-as-promised")).should();
const EVMRevert = require("./helpers/VMExceptionRevert");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const TrustCare = artifacts.require("../contracts/app/TrustCare.sol");
const DoctorsRegistry = artifacts.require(
  "../contracts/registries/DoctorsRegistry.sol"
);
const HealthInsurancesRegistry = artifacts.require(
  "../contracts/registries/HealthInsurancesRegistry.sol"
);
const PatientsRegistry = artifacts.require(
  "../contracts/registries/PatientsRegistry.sol"
);

contract("Trustcare", (accounts) => {
  let doctorsRegistry;
  let healthInsurancesRegistry;
  let patientsRegistry;
  let trustCare;
  const admin = accounts[0];
  const doctor1 = accounts[1];
  // const doctor2 = accounts[2];
  const patient1 = accounts[3];
  const patient2 = accounts[4];
  const insurance1 = accounts[5];
  const insurance2 = accounts[6];

  beforeEach(async () => {
    doctorsRegistry = await DoctorsRegistry.new({ from: admin });
    healthInsurancesRegistry = await HealthInsurancesRegistry.new({
      from: admin,
    });
    patientsRegistry = await PatientsRegistry.new({ from: admin });
    trustCare = await TrustCare.new(
      doctorsRegistry.address,
      healthInsurancesRegistry.address,
      patientsRegistry.address,
      { from: admin }
    );
    await doctorsRegistry.bindToTrustCare(trustCare.address, { from: admin });
    await healthInsurancesRegistry.bindToTrustCare(trustCare.address, {
      from: admin,
    });
    await patientsRegistry.bindToTrustCare(trustCare.address, { from: admin });
    await doctorsRegistry.addAdmin(admin, { from: admin });
    await healthInsurancesRegistry.addAdmin(admin, { from: admin });
    await patientsRegistry.addAdmin(admin, { from: admin });
  });

  it("Should do the whole process to validate a consultation", async () => {
    // re create transactionID
    const transactionID = web3.utils.keccak256(
      web3.eth.abi.encodeParameters(
        ["uint", "uint", "address", "address", "string"],
        [1, 20201121, doctor1, patient1, "prescription hash"]
      )
    );
    // register a new doctor
    await doctorsRegistry.registerNewDoctor(doctor1, 100000, [1, 3], {
      from: admin,
    }).should.be.fulfilled;
    // add consultation fails if doctor is not validated for this category
    await doctorsRegistry
      .addConsultation(2, 20201121, patient1, "prescription hash", {
        from: doctor1,
      })
      .should.be.rejectedWith(EVMRevert);
    // add consultation
    await doctorsRegistry.addConsultation(
      1,
      20201121,
      patient1,
      "prescription hash",
      { from: doctor1 }
    ).should.be.fulfilled;
    // checks that status of transaction is 1
    (await trustCare.getTransactionStatus(transactionID))
      .toString()
      .should.equal("1");
    // registers new patients
    await patientsRegistry.registerNewPatient(
      patient1,
      "1234543213454",
      true,
      3,
      32,
      352,
      0,
      insurance1,
      { from: admin }
    ).should.be.fulfilled;
    await patientsRegistry.registerNewPatient(
      patient2,
      "1234543213457",
      true,
      3,
      32,
      33,
      0,
      insurance2,
      { from: admin }
    ).should.be.fulfilled;
    // approve transaction fails if patient is not valid
    await patientsRegistry
      .approveTransaction(transactionID, { from: patient2 })
      .should.be.rejectedWith(EVMRevert);
    // approve transaction success
    await patientsRegistry.approveTransaction(transactionID, { from: patient1 })
      .should.be.fulfilled;
    // checks that the transaction status is updated to 2
    (await trustCare.getTransactionStatus(transactionID))
      .toString()
      .should.equal("2");
    // checks that the patient cannot validate twice
    await patientsRegistry
      .approveTransaction(transactionID, { from: patient1 })
      .should.be.rejectedWith(EVMRevert);
    // registers insurances companies
    await healthInsurancesRegistry.registerNewHealthInsurance(
      insurance1,
      1223323442,
      32,
      { from: admin }
    ).should.be.fulfilled;
    await healthInsurancesRegistry.registerNewHealthInsurance(
      insurance2,
      1223323457,
      35,
      { from: admin }
    ).should.be.fulfilled;
    // approve transaction fails if insurance is not valid
    await healthInsurancesRegistry
      .approveTransaction(transactionID, { from: insurance2 })
      .should.be.rejectedWith(EVMRevert);
    // approval success
    await healthInsurancesRegistry.approveTransaction(transactionID, {
      from: insurance1,
    }).should.be.fulfilled;
    // cannot validate twice
    await healthInsurancesRegistry
      .approveTransaction(transactionID, { from: insurance1 })
      .should.be.rejectedWith(EVMRevert);
    // checks that status has been updated to 3
    (await trustCare.getTransactionStatus(transactionID))
      .toString()
      .should.equal("3");
  });

  it("Should add doctors if admin", async () => {
    await doctorsRegistry
      .registerNewDoctor(doctor1, 100000, [1, 3], { from: patient1 })
      .should.be.rejectedWith(EVMRevert);
    await doctorsRegistry.registerNewDoctor(doctor1, 100000, [1, 3], {
      from: admin,
    }).should.be.fulfilled;
    await doctorsRegistry
      .registerNewDoctor(doctor1, 100000, [1, 3], { from: admin })
      .should.be.rejectedWith(EVMRevert);
  });
});
