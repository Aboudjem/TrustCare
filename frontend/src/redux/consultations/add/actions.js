import axios from "../../../axios";

export const NEW_CONSULTATION_CHANGE_FIELD = 'NEW_CONSULTATION_CHANGE_FIELD';
export const NEW_CONSULTATION_SUBMIT_PENDING = 'NEW_CONSULTATION_SUBMIT_PENDING';
export const NEW_CONSULTATION_SUBMIT_SUCCESS = 'NEW_CONSULTATION_SUBMIT_SUCCESS';
export const NEW_CONSULTATION_SUBMIT_FAILURE = 'NEW_CONSULTATION_SUBMIT_FAILURE';


//const ethers = require("ethers");
//const TrustCare = require("TrustCare");


export function newConsultationChangeField(field, value) {
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

export function newConsultationSubmut(history) {
    return async (dispatch, getState) => {
        try {
            const fields = getState().consultations.add.fields;
            const doctorAddress = getState().account.address
            let res = await axios.get('/patient',
                {
                    params: {
                        'cns_number': fields.cns_number
                    }
                });
            if (res.data.length < 1) {
                dispatch(newConsultationSubmitFailure("No patient for number"))
            }
            const patientAddress = res.data[0].address;
            const patientId = res.data[0]._id;

            res = await axios.get('/doctor',
                {
                    query: {
                        'address': doctorAddress
                    }
                });
            if (res.data.length < 1) {
                dispatch(newConsultationSubmitFailure("No doctor for number"))
            }

            const doctorId = res.data[0]._id;
            const timestamp = Date.now();
            await axios.post('/consultation', {
                doctor_id: doctorId,
                patient_id: patientId,
                approved_by_patient: false,
                approved_by_insurance: false,
                timestamp: timestamp,
                category: fields.category,
                prescription: fields.prescription
            });
            /*const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
            const trustCare = await TrustCare.at(process.env.REACT_APP_TRUST_CARE_CONTRACT, signer);
            await trustCare.addConsultation(fields.category, timestamp, patientAddress, fields.prescription);*/
            dispatch(newConsultationSubmitSuccess())
            history.push('/')
        } catch (err) {
            console.error(err)
            dispatch(newConsultationSubmitFailure(err.message))
        }
    };
}
