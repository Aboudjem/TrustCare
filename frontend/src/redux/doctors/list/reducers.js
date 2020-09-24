import {
    DOCTORS_LOAD_FAILURE, DOCTORS_LOAD_SUCCESS,
    DOCTORS_LOADING,
} from "./actions";

export default function list(state = { loading: true }, action) {
    switch (action.type) {
        case DOCTORS_LOADING:
            return {
                ...state,
                doctors: null,
                error: null,
                loading: true,
            };
        case DOCTORS_LOAD_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case DOCTORS_LOAD_SUCCESS:
            return {
                ...state,
                doctors: action.doctors,
                loading: false
            }
        default:
            return state;
    }
}