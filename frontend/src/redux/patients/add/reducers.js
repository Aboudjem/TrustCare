import {
    NEW_PATIENT_CHANGE_FIELD,
    NEW_PATIENT_SUBMIT_FAILURE,
    NEW_PATIENT_SUBMIT_PENDING,
    NEW_PATIENT_SUBMIT_SUCCESS
} from "./actions";

export default function add(state = { fields: [], loading: false }, action) {
    switch (action.type) {
        case NEW_PATIENT_CHANGE_FIELD:
            return {
                ...state,
                error: false,
                fields: {
                    ...state.fields,
                    [action.field]: action.value
                },
            }
        case NEW_PATIENT_SUBMIT_PENDING:
            return {
                ...state,
                loading: true
            }
        case NEW_PATIENT_SUBMIT_SUCCESS:
            return {
                ...state,
                fields: [],
                loading: false
            }
        case NEW_PATIENT_SUBMIT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}