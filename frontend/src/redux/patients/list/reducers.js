import {PATIENTS_LOAD_FAILURE, PATIENTS_LOAD_SUCCESS, PATIENTS_LOADING} from "./actions";

export default function list(state = { loading: true }, action) {
    switch (action.type) {
        case PATIENTS_LOADING:
            return {
                ...state,
                patients: null,
                error: null,
                loading: true,
            };
        case PATIENTS_LOAD_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case PATIENTS_LOAD_SUCCESS:
            return {
                ...state,
                patients: action.patients,
                loading: false
            }
        default:
            return state;
    }
}