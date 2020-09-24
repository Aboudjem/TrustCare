import {
    INSURANCES_LOAD_FAILURE, INSURANCES_LOAD_SUCCESS,
    INSURANCES_LOADING,
} from "./actions";

export default function list(state = { loading: true }, action) {
    switch (action.type) {
        case INSURANCES_LOADING:
            return {
                ...state,
                insurances: null,
                error: null,
                loading: true,
            };
        case INSURANCES_LOAD_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case INSURANCES_LOAD_SUCCESS:
            return {
                ...state,
                insurances: action.insurances,
                loading: false
            }
        default:
            return state;
    }
}