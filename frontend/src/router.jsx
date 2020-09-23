import {Redirect, Route, Switch} from "react-router";
import React from "react";
import Home from "./presentationnal/Home";
import PatientList from "./container/Patients/List";

export default function () {
    return <Switch>
        <Route exact path="/patients" component={PatientList}/>
        <Route exact path="/" component={Home}/>
        <Redirect to="/" />
    </Switch>
}