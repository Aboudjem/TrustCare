import axios from "../../../axios";

export const NEW_DOCTOR_CHANGE_FIELD = 'NEW_DOCTOR_CHANGE_FIELD';
export const NEW_DOCTOR_SUBMIT_PENDING = 'NEW_DOCTOR_SUBMIT_PENDING';
export const NEW_DOCTOR_SUBMIT_SUCCESS = 'NEW_DOCTOR_SUBMIT_SUCCESS';
export const NEW_DOCTOR_SUBMIT_FAILURE = 'NEW_DOCTOR_SUBMIT_FAILURE';


export function newDoctorChangeField(field, value) {
    return {
        type: NEW_DOCTOR_CHANGE_FIELD,
        field,
        value
    }
}

export function newDoctorSubmitPending() {
    return {
        type: NEW_DOCTOR_SUBMIT_PENDING
    }
}

export function newDoctorSubmitSuccess() {
    return {
        type: NEW_DOCTOR_SUBMIT_SUCCESS
    }
}

export function newDoctorSubmitFailure(error) {
    return {
        type: NEW_DOCTOR_SUBMIT_FAILURE,
        error
    }
}

export function newDoctorSubmit(history) {
    return (dispatch, getState) => {
        const fields = getState().doctors.add.fields;
        dispatch(newDoctorSubmitPending())
        axios.post('/doctor', {
            ...fields
        }).then(() => {
            dispatch(newDoctorSubmitSuccess())
            history.push('/doctors')
        }).catch(err => {
            dispatch(newDoctorSubmitFailure(err.message))
        })
    }
}
