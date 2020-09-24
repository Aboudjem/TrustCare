import axios from "../../../axios";
import {newInsuranceSubmitFailure} from "../../insurance/add/actions";

export const NEW_CONSULTATION_CHANGE_FIELD = 'NEW_CONSULTATION_CHANGE_FIELD';
export const NEW_CONSULTATION_SUBMIT_PENDING = 'NEW_CONSULTATION_SUBMIT_PENDING';
export const NEW_CONSULTATION_SUBMIT_SUCCESS = 'NEW_CONSULTATION_SUBMIT_SUCCESS';
export const NEW_CONSULTATION_SUBMIT_FAILURE = 'NEW_CONSULTATION_SUBMIT_FAILURE';


export function newInsuranceChangeField(field, value) {
    return {
        type: NEW_CONSULTATION_CHANGE_FIELD,
        field,
        value
    }
}

export function newConsultationSubmitPending() {
    return {
        type: NEW_CONSULTATION_SUBMIT_PENDING
    }
}

export function newConsultationSubmitSuccess() {
    return {
        type: NEW_CONSULTATION_SUBMIT_SUCCESS
    }
}

export function newConsultationSubmitFailure(error) {
    return {
        type: NEW_CONSULTATION_SUBMIT_FAILURE,
        error
    }
}

export function newInsuranceSubmit(history) {
    return (dispatch, getState) => {
        const fields = getState().consultations.add.fields;
        const doctorAddress = getState().account.address
        axios.get({
            url: '/patient',
            query: {
                'cns_number': fields.cns_number
            }
        }).catch(error => {
            dispatch(newInsuranceSubmitFailure(error.message))
        }).then(res => {
            if (res.data.length < 1) {
                dispatch(newInsuranceSubmitFailure("No patient for number"))
            }
            const patientAddress = res.data[0].address;
            const patientId = res.data[0]._id;

            axios.get({
                url: '/doctor',
                query: {
                    'address': doctorAddress
                }
            }).catch(error => {
                dispatch(newInsuranceSubmitFailure(error.message))
            }).then(res => {
                if (res.data.length < 1) {
                    dispatch(newInsuranceSubmitFailure("No patient for number"))
                }
                const doctorId = res.data[0]._id;
                axios.post('/insurance', {
                    doctor_id: doctorId,
                    patient_id: patientId,
                    approved_by_patient: false,
                    approved_by_insurance: false,
                    category: fields.category,
                    prescription: fields.prescription
                }).then(() => {
                    dispatch(newConsultationSubmitSuccess())
                    history.push('/')
                }).catch(err => {
                    dispatch(newInsuranceSubmitFailure(err.message))
                })
            })
        })
    };
}
