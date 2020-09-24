import axios from "../../../axios";

export const NEW_CONSULTATION_CHANGE_FIELD = 'NEW_CONSULTATION_CHANGE_FIELD';
export const NEW_CONSULTATION_SUBMIT_PENDING = 'NEW_CONSULTATION_SUBMIT_PENDING';
export const NEW_CONSULTATION_SUBMIT_SUCCESS = 'NEW_CONSULTATION_SUBMIT_SUCCESS';
export const NEW_CONSULTATION_SUBMIT_FAILURE = 'NEW_CONSULTATION_SUBMIT_FAILURE';


const ethers = require("ethers");
const TrustCare = require("TrustCare");


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
            dispatch(newConsultationSubmitFailure(error.message))
        }).then(res => {
            if (res.data.length < 1) {
                dispatch(newConsultationSubmitFailure("No patient for number"))
            }
            const patientAddress = res.data[0].address;
            const patientId = res.data[0]._id;

            axios.get({
                url: '/doctor',
                query: {
                    'address': doctorAddress
                }
            }).catch(error => {
                dispatch(newConsultationSubmitFailure(error.message))
            }).then(res => {
                if (res.data.length < 1) {
                    dispatch(newConsultationSubmitFailure("No patient for number"))
                }
                const doctorId = res.data[0]._id;
                axios.post('/insurance', {
                    doctor_id: doctorId,
                    patient_id: patientId,
                    approved_by_patient: false,
                    approved_by_insurance: false,
                    timestamp: Date.now(),
                    category: fields.category,
                    prescription: fields.prescription
                }).then(async() => {
                    const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
                    const trustCare = await TrustCare.at(process.env.REACT_APP_TRUST_CARE_CONTRACT, signer);
                    await trustCare.addConsultation(fields.category, Date.now() ,patientId, fields.prescription);
                    dispatch(newConsultationSubmitSuccess())
                    history.push('/')
                }).catch(err => {
                    dispatch(newConsultationSubmitFailure(err.message))
                })
            })
        })
    };
}
