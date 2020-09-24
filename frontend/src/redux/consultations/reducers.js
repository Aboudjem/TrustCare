import {combineReducers} from "redux";
import add from './add/reducers'
import list from './list/reducers'

export default combineReducers({
    add,
    list
})