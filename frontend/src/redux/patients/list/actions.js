import axios from '../../../axios';

export const PATIENTS_LOADING = 'PATIENTS_LOADING';
export const PATIENTS_LOAD_SUCCESS = 'PATIENTS_LOAD_SUCCESS';
export const PATIENTS_LOAD_FAILURE = 'PATIENTS_LOAD_FAILURE';

export function loadPatients() {
    return (dispatch) => {
        dispatch(patientLoading());
        axios.get('/patient?sort=cns_number').then(res => {
            dispatch(patientLoadSuccess(res.data))
        }).catch(error => {
            dispatch(patientLoadFailure(error.message))
        })
    }
}

export function patientLoading() {
    return {
        type: PATIENTS_LOADING
    }
}

export function patientLoadSuccess(patients) {
    return {
        type: PATIENTS_LOAD_SUCCESS,
        patients
    }

}

export function patientLoadFailure(error) {
    return {
        type: PATIENTS_LOAD_FAILURE,
        error
    }
}

