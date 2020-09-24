import {combineReducers} from "redux";
import patients from "./patients/reducers";
import doctors from "./doctors/reducers";
import account from "./account/reducers";
import insurances from "./insurance/reducers";
import consultations from "./consultations/reducers";


export const app = combineReducers({
    patients,
    doctors,
    insurances,
    consultations,
    account
});