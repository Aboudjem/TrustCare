import {combineReducers} from "redux";
import patients from "./patients/reducers";
import doctors from "./doctors/reducers";
import account from "./account/reducers";

export const app = combineReducers({
    patients,
    doctors,
    account
});