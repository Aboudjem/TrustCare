const assert = require('assert');

const { Signer, Contract } = require('ethers');

async function connectAt(contractAddress, abi, caller) {
    return new Contract(contractAddress, abi, caller);
}

async function requireSigner(caller) {
    assert(Signer.isSigner(caller), 'Must connect as a Signer');
}

module.exports = { connectAt, requireSigner };