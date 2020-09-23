import {applyMiddleware, createStore} from "redux";
import {app} from "./redux/reducers";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

export const store = createStore(
    app,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)