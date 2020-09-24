import axios from '../../../axios';

export const DOCTORS_LOADING = 'DOCTORS_LOADING';
export const DOCTORS_LOAD_SUCCESS = 'DOCTORS_LOAD_SUCCESS';
export const DOCTORS_LOAD_FAILURE = 'DOCTORS_LOAD_FAILURE';

export function loadDoctors() {
    return (dispatch) => {
        dispatch(doctorsLoading());
        axios.get('/doctor?sort=licence').then(res => {
            dispatch(doctorsLoadSuccess(res.data))
        }).catch(error => {
            dispatch(doctorsLoadFailure(error.message))
        })
    }
}

export function doctorsLoading() {
    return {
        type: DOCTORS_LOADING
    }
}

export function doctorsLoadSuccess(doctors) {
    return {
        type: DOCTORS_LOAD_SUCCESS,
        doctors
    }

}

export function doctorsLoadFailure(error) {
    return {
        type: DOCTORS_LOAD_FAILURE,
        error
    }
}

