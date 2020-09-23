import axios from "../../../axios";

export const NEW_PATIENT_CHANGE_FIELD = 'NEW_PATIENT_CHANGE_FIELD';
export const NEW_PATIENT_SUBMIT_PENDING = 'NEW_PATIENT_SUBMIT_PENDING';
export const NEW_PATIENT_SUBMIT_SUCCESS = 'NEW_PATIENT_SUBMIT_SUCCESS';
export const NEW_PATIENT_SUBMIT_FAILURE = 'NEW_PATIENT_SUBMIT_FAILURE';


export function newPatientChangeField(field, value) {
    return {
        type: NEW_PATIENT_CHANGE_FIELD,
        field,
        value
    }
}

export function newPatientSubmitPending() {
    return {
        type: NEW_PATIENT_SUBMIT_PENDING
    }
}

export function newPatientSubmitSuccess() {
    return {
        type: NEW_PATIENT_SUBMIT_SUCCESS
    }
}

export function newPatientSubmitFailure(error) {
    return {
        type: NEW_PATIENT_SUBMIT_FAILURE,
        error
    }
}

export function newPatientSubmit(history) {
    return (dispatch, getState) => {
        const fields = getState().patients.add.fields;
        dispatch(newPatientSubmitPending())
        axios.post('/patient', {
            ...fields
        }).then(() => {
            dispatch(newPatientSubmitSuccess())
            history.push('/patients')
        }).catch(err => {
            dispatch(newPatientSubmitFailure(err.message))
        })
    }
}
