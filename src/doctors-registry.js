import {
    addConsultation, consultation,
    deleteDoctor,
    deployDoctorsRegistry, doctor,
    registerNewDoctor,
    updateDoctor
} from "./contract-methods/doctorsRegistry.methods";

const { BigNumber } = require("ethers/utils");

const { connectAt, requireSigner } = require("../utils/utils");
// const methods = require("../contract-methods/TrustCare.methods");
// const Compliance = require("../../build/contracts/TrustCare.json");

class TrustCare {

    static doctorsRegistryInstance;

  constructor(caller) {
    this.caller = caller;
  }

  static async deployFullTrustCare(signer) {
    await requireSigner(signer);
    const DoctorsRegistry = await deployDoctorsRegistry(signer)
    return new TrustCare(DoctorsRegistry, signer);
  }

    static async deployDoctorsRegistry(signer) {
        await requireSigner(signer);
        this.doctorsRegistryInstance = await deployDoctorsRegistry(signer)
    }

  static async at(contractAddress, caller) {
    const trustCareInstance = await connectAt(
      contractAddress,
      TrustCare.abi,
      caller
    );
    return new TrustCare(trustCareInstance, caller);
  }


  async registerNewDoctor(userAddress, license, categories) {
    await requireSigner(this.caller);
    return registerNewDoctor(userAddress, license, categories, this.doctorsRegistryInstance)
  }


    async deleteDoctor(userAddress) {
        await requireSigner(this.caller);
        return deleteDoctor(userAddress, this.doctorsRegistryInstance)
    }

    async updateDoctor(userAddress, categories) {
        await requireSigner(this.caller);
        return updateDoctor(userAddress, categories, this.doctorsRegistryInstance)
    }

    async doctor(userAddress) {
        await requireSigner(this.caller);
        return doctor(userAddress, this.doctorsRegistryInstance)
    }

    async addConsultation(category, patient, prescription) {
        await requireSigner(this.caller);
        return addConsultation(category, patient, prescription, this.doctorsRegistryInstance)
    }

    async consultation(category, patient, prescription) {
        await requireSigner(this.caller);
        return consultation(category, patient, prescription, this.doctorsRegistryInstance)
    }

}

module.exports = TrustCare;
