import axios from "../../../axios";

export const NEW_INSURANCE_CHANGE_FIELD = 'NEW_INSURANCE_CHANGE_FIELD';
export const NEW_INSURANCE_SUBMIT_PENDING = 'NEW_INSURANCE_SUBMIT_PENDING';
export const NEW_INSURANCE_SUBMIT_SUCCESS = 'NEW_INSURANCE_SUBMIT_SUCCESS';
export const NEW_INSURANCE_SUBMIT_FAILURE = 'NEW_INSURANCE_SUBMIT_FAILURE';


export function newInsuranceChangeField(field, value) {
    return {
        type: NEW_INSURANCE_CHANGE_FIELD,
        field,
        value
    }
}

export function newInsuranceSubmitPending() {
    return {
        type: NEW_INSURANCE_SUBMIT_PENDING
    }
}

export function newInsuranceSubmitSuccess() {
    return {
        type: NEW_INSURANCE_SUBMIT_SUCCESS
    }
}

export function newInsuranceSubmitFailure(error) {
    return {
        type: NEW_INSURANCE_SUBMIT_FAILURE,
        error
    }
}

export function newInsuranceSubmit(history) {
    return (dispatch, getState) => {
        const fields = getState().insurances.add.fields;
        dispatch(newInsuranceSubmitPending())
        axios.post('/insurance', {
            ...fields
        }).then(() => {
            dispatch(newInsuranceSubmitSuccess())
            history.push('/admin/insurances')
        }).catch(err => {
            dispatch(newInsuranceSubmitFailure(err.message))
        })
    }
}
