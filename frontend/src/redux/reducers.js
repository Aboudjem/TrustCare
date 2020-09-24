import {combineReducers} from "redux";
import patients from "./patients/reducers";
import doctors from "./doctors/reducers";
import account from "./account/reducers";
import insurances from "./insurance/reducers";

export const app = combineReducers({
    patients,
    doctors,
    insurances,
    account
});