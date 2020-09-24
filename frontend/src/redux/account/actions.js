export const ACCOUNT_CONNECTED = 'ACCOUNT_CONNECTED';
export const ACCOUNT_CONNECTION_PENDING = 'ACCOUNT_CONNECTION_PENDING';
export const ACCOUNT_CONNECTION_FAILED = 'ACCOUNT_CONNECTION_FAILED';
export const ACCOUNT_CHANGED = 'ACCOUNT_CHANGED';


// const TrustCare = require("../src/TrustCare");
const ethers = require("ethers");
const TrustCare = require("TrustCare");
const TRUST_CARE_CONTRACT=process.env.REACT_APP_TRUST_CARE_CONTRACT;
const DOCTORS_REGISTRY_CONTRACT="0xe69B29799D3192583B615792e0DdfC74C241106F";
const PATIENTS_REGISTRY_CONTRACT="0xFfd4D16fE711D8aE2c81C22d091ff9b4582EB0dA";
const HEALTH_INSURANCE_REGISTRY_CONTRACT="0x1944aB9ab4D0E33ddE496594D42d0B37527133ee";

async function getRoles(address) {
    const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner()
    const trustCare = await TrustCare.at(TRUST_CARE_CONTRACT, signer);

    let tab = [];
   if(await trustCare.isAdmin(await signer.getAddress())) {
       tab.push('admin');
   }
   if (await trustCare.isDoctor(await signer.getAddress())) {
       tab.push('doctor');
   }

   if(await signer.getAddress() === '0xDF24A39713ed06CDF6d4f7C1F76f67d932FCF64D') {
       tab.push('patient');
   }

    if(await signer.getAddress() === '0x00E3644053e637421AC1f0f1397Abb05e07ff27b') {
        tab.push('healthInsurance');
    }

    console.log(tab);

    // console.log('HealthInsurance', await trustCare.showHealthInsuranceUUID(await signer.getAddress()));
    return tab;
}

export function connectAccount() {
    return (dispatch) => {
        if (typeof window.ethereum === 'undefined') {
            dispatch(accountConnectionFailed('MetaMask is not installed'));
            return;
        }
        dispatch(accountConnectionPending())
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(async accounts => {
            dispatch(accountConnected(accounts[0], await getRoles(accounts[0])))
            window.ethereum.on('accountsChanged', async function (accounts) {
                dispatch(accountChanged(accounts[0], await getRoles(accounts[0])))
            });

        }).catch(error => {
            console.error(error);
            dispatch(accountConnectionFailed(error.message))
        })
    }
}


export function accountConnectionFailed(error) {
    return {
        type: ACCOUNT_CONNECTION_FAILED,
        error
    }
}

export function accountConnected(address, roles) {
    return {
        type: ACCOUNT_CONNECTED,
        address,
        roles
    }
}

export function accountConnectionPending() {
    return {
        type: ACCOUNT_CONNECTION_PENDING
    }
}

export function accountChanged(address, roles) {
    return {
        type: ACCOUNT_CHANGED,
        address,
        roles
    }
}
