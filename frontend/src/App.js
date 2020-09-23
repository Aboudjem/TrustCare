import React from 'react';
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";
import './App.css';
import {theme} from "./theme";
import {Provider} from "react-redux";
import {store} from "./store";
import Menu from './presentationnal/Menu';
import {BrowserRouter} from "react-router-dom";
import Router from './router';

function App() {
    return (
        <>
            <CssBaseline />
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Menu>
                            <Router />
                        </Menu>
                    </BrowserRouter>
                </Provider>
            </MuiThemeProvider>
        </>
    );
}

export default App;
