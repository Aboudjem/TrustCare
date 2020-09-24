import axios from '../../../axios';

export const INSURANCES_LOADING = 'INSURANCES_LOADING';
export const INSURANCES_LOAD_SUCCESS = 'INSURANCES_LOAD_SUCCESS';
export const INSURANCES_LOAD_FAILURE = 'INSURANCES_LOAD_FAILURE';

export function loadInsurances() {
    return (dispatch) => {
        dispatch(insurancesLoading());
        axios.get('/insurance?sort=name').then(res => {
            dispatch(insurancesLoadSuccess(res.data))
        }).catch(error => {
            dispatch(insurancesLoadFailure(error.message))
        })
    }
}

export function insurancesLoading() {
    return {
        type: INSURANCES_LOADING
    }
}

export function insurancesLoadSuccess(insurances) {
    return {
        type: INSURANCES_LOAD_SUCCESS,
        insurances
    }

}

export function insurancesLoadFailure(error) {
    return {
        type: INSURANCES_LOAD_FAILURE,
        error
    }
}

