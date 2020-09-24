export const ACCOUNT_CONNECTED = 'ACCOUNT_CONNECTED';
export const ACCOUNT_CONNECTION_PENDING = 'ACCOUNT_CONNECTION_PENDING';
export const ACCOUNT_CONNECTION_FAILED = 'ACCOUNT_CONNECTION_FAILED';
export const ACCOUNT_CHANGED = 'ACCOUNT_CHANGED';

export function connectAccount() {
    return (dispatch) => {
        if (typeof window.ethereum === 'undefined') {
            dispatch(accountConnectionFailed('MetaMask is not installed'));
            return;
        }
        dispatch(accountConnectionPending())
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
            dispatch(accountConnected(accounts[0]))
            window.ethereum.on('accountsChanged', function (accounts) {
                dispatch(accountChanged(accounts[0]))
            });

        }).catch(error => {
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

export function accountConnected(address) {
    return {
        type: ACCOUNT_CONNECTED,
        address
    }
}

export function accountConnectionPending() {
    return {
        type: ACCOUNT_CONNECTION_PENDING
    }
}

export function accountChanged(address) {
    return {
        type: ACCOUNT_CHANGED,
        address
    }
}
