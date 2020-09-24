import {
    ACCOUNT_CHANGED,
    ACCOUNT_CONNECTED,
    ACCOUNT_CONNECTION_FAILED, ACCOUNT_CONNECTION_PENDING
} from "./actions";


export default function account(state = {
    connected: false,
    address: null,
    error: null,
    loading: false,
    roles: []
}, action) {
    switch (action.type) {
        case ACCOUNT_CONNECTED:
            return {
                ...state,
                connected: true,
                address: action.address,
                error: null,
                loading: false,
                roles: action.roles
            }
        case ACCOUNT_CHANGED:
            return {
                ...state,
                address: action.address,
                roles: action.roles
            }
        case ACCOUNT_CONNECTION_PENDING:
            return {
                ...state,
                address: null,
                error: null,
                loading: true,
            }
        case ACCOUNT_CONNECTION_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false,
                roles: []
            }
        default:
            return state;
    }
}