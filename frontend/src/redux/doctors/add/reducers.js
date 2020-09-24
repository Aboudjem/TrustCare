import {
    NEW_DOCTOR_CHANGE_FIELD,
    NEW_DOCTOR_SUBMIT_FAILURE,
    NEW_DOCTOR_SUBMIT_PENDING,
    NEW_DOCTOR_SUBMIT_SUCCESS
} from "./actions";


export default function add(state = { fields: [], loading: false }, action) {
    switch (action.type) {
        case NEW_DOCTOR_CHANGE_FIELD:
            return {
                ...state,
                error: false,
                fields: {
                    ...state.fields,
                    [action.field]: action.value
                },
            }
        case NEW_DOCTOR_SUBMIT_PENDING:
            return {
                ...state,
                loading: true
            }
        case NEW_DOCTOR_SUBMIT_SUCCESS:
            return {
                ...state,
                fields: [],
                loading: false
            }
        case NEW_DOCTOR_SUBMIT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}