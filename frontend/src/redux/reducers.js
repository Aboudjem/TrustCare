import {combineReducers} from "redux";
import patients from "./patients/reducers";

export const app = combineReducers({
    patients
});