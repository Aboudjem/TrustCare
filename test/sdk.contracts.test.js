require("chai").use(require("chai-as-promised")).should();
const { expect } = require("chai");
const ethers = require("ethers");

const TrustCare = require("../src/TrustCare");

const url = "http://localhost:8545";
const provider = new ethers.providers.JsonRpcProvider(url);

contract("TrustCare", () => {
  let trustCare;
  const user0 = provider.getSigner(0);

  beforeEach(async () => {
    trustCare = await TrustCare.deployFullTrustCare(user0);
  });

  describe("Deploy Contract", () => {
    it("Should able to deploy all TrustCare contracts", async () => {
      expect(trustCare.doctorsRegistryInstance.address).to.include("0x");
      expect(trustCare.healthInsuranceInstance.address).to.include("0x");
      expect(trustCare.patientsRegistryInstance.address).to.include("0x");
      expect(trustCare.trustCareInstance.address).to.include("0x");
    });

    it("should returns false as user is not a Doctor", async () => {
      const isDoctor = await trustCare.isDoctor(await user0.getAddress());
      isDoctor.should.be.eq(false);
    });

    it("should returns false as user is not a Validator", async () => {
      const isValidator = await trustCare.isValidator(await user0.getAddress());
      isValidator.should.be.eq(false);
    });

    it("should returns false as user is not a Admin", async () => {
      const isAdmin = await trustCare.isAdmin(await user0.getAddress());
      isAdmin.should.be.eq(false);
    });
  });
});
