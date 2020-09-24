require("chai").use(require("chai-as-promised")).should();
const { expect } = require("chai");
const ethers = require("ethers");

const TrustCare = require("../src/TrustCare");

const url = "http://localhost:8545";
const provider = new ethers.providers.JsonRpcProvider(url);

contract("TrustCare", () => {
  let trustCare;
    const user0 = provider.getSigner(0);
    const user1 = provider.getSigner(1);
    const user2 = provider.getSigner(2);
    const user3 = provider.getSigner(3);
    const user4 = provider.getSigner(4);

    let userAddress0;
    let userAddress1;
    let userAddress2;
    let userAddress3;
    let userAddress4;

  beforeEach(async () => {
    trustCare = await TrustCare.deployFullTrustCare(user0);
    userAddress0 = await user0.getAddress();
    userAddress1 = await user1.getAddress();
    userAddress2 = await user2.getAddress();
    userAddress3 = await user3.getAddress();
    userAddress4 = await user4.getAddress();
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

    describe("DoctorsRegistry", () => {
        it("should register new Doctor", async () => {
            await trustCare.addAdmin(userAddress0);
            (await trustCare.isDoctor(userAddress1)).should.be.eq(false);
            await trustCare.registerNewDoctor(userAddress1, 100000, [1, 3]);
            (await trustCare.isDoctor(userAddress1)).should.be.eq(true);
        });

        it("should register new Doctor and remove it", async () => {
            await trustCare.addAdmin(userAddress0);
            (await trustCare.isDoctor(userAddress1)).should.be.eq(false);
            await trustCare.registerNewDoctor(userAddress1, 100000, [1, 3]);
            (await trustCare.isDoctor(userAddress1)).should.be.eq(true);
            await trustCare.deleteDoctor(userAddress1);
            (await trustCare.isDoctor(userAddress1)).should.be.eq(false);
        });

        it("should register new Doctor and update it", async () => {
            await trustCare.addAdmin(userAddress0);
            (await trustCare.isDoctor(userAddress1)).should.be.eq(false);
            await trustCare.registerNewDoctor(userAddress1, 100000, [1, 3]);
            (await trustCare.isDoctor(userAddress1)).should.be.eq(true);
            let res = ((await trustCare.doctorCategories(userAddress1)));
            res = res.map((r) => r.toNumber());
            (res.toString()).should.be.eq([1,3].toString());
            await trustCare.updateDoctor(userAddress1, [2,3]);
            res = ((await trustCare.doctorCategories(userAddress1)));
            (res.toString()).should.be.eq([2,3].toString());
        });

        it("should register new Doctor and return doctor License", async () => {
            await trustCare.addAdmin(userAddress0);
            (await trustCare.isDoctor(userAddress1)).should.be.eq(false);
            await trustCare.registerNewDoctor(userAddress1, 100000, [1, 3]);
            (await trustCare.isDoctor(userAddress1)).should.be.eq(true);
            ((await trustCare.doctorLicense(userAddress1)).toNumber()).should.be.eq(100000);

        });

        // it("should register new Doctor and new consultation", async () => {
        //     await trustCare.addAdmin(userAddress0).then(tx => tx.wait());
        //     (await trustCare.isDoctor(userAddress1)).should.be.eq(false);
        //
        //     await trustCare.registerNewDoctor(userAddress0, 100000, [1, 3]).then(tx => tx.wait());
        //     await trustCare.addConsultation(3, 20201121, userAddress2, "prescription hash");
        // });


    });
});


contract("TrustCare", () => {
    let trustCare;
    const admin = provider.getSigner(0);
    const doctor = provider.getSigner(1);
    const patient = provider.getSigner(2);
    const user3 = provider.getSigner(3);
    const user4 = provider.getSigner(4);

    let adminAddress;
    let doctorAddress;
    let patientAddress;
    let userAddress3;
    let userAddress4;

    beforeEach(async () => {
        trustCare = await TrustCare.deployFullTrustCare(admin);
        adminAddress = await admin.getAddress();
        doctorAddress = await doctor.getAddress();
        patientAddress = await patient.getAddress();
        userAddress3 = await user3.getAddress();
        userAddress4 = await user4.getAddress();
        await trustCare.addAdmin(adminAddress);
        await trustCare.patientsRegistryInstance.addAdmin(adminAddress);
        await trustCare.registerNewDoctor(doctorAddress, 100000, [1, 3]);
        await trustCare.registerNewPatient(patientAddress, '12345', true, 1, 10, 20, 10, ethers.constants.AddressZero);
    });

    describe("PatientsRegistry", () => {
        it("should delete patient", async () => {
            await trustCare.deletePatient(patientAddress);
        });

        it("should show age Category of patient", async () => {
             expect((await trustCare.showAgeCategory(patientAddress)).toNumber()).to.eq(1);
        });

        it("should show IsMale of patient", async () => {
            expect((await trustCare.showIsMale(patientAddress))).to.eq(true);
        });

        it("should show CountryOfResidenceCode of patient", async () => {
            expect((await trustCare.showCountryOfResidenceCode(patientAddress)).toNumber()).to.eq(10);
        });

        it("should show CountryOfWorkCode of patient", async () => {
            expect((await trustCare.showCountryOfWorkCode(patientAddress)).toNumber()).to.eq(20);
        });

        it("should show PatientCNSNumber of patient", async () => {
            expect((await trustCare.showPatientCNSNumber(patientAddress))).to.eq('12345');
        });

        it("should show InvalidityPercentage of patient", async () => {
            expect((await trustCare.showInvalidityPercentage(patientAddress)).toNumber()).to.eq(10);
        });

        it("should show HealthInsurance of patient", async () => {
            expect((await trustCare.showHealthInsurance(patientAddress))).to.eq(ethers.constants.AddressZero);
        });
    });

    describe("DoctorsRegistry - Consultation", () => {
        // it("should add a Consultation", async () => {
        //     await trustCare.addConsultation(1, 9999, patientAddress, "Prescription Hash");
        // });

    });

});
