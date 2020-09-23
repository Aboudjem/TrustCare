import {Redirect, Route, Switch} from "react-router";
import React from "react";
import Home from "./presentationnal/Home";
import PatientList from "./container/Patients/List";
import PatientAdd from "./container/Patients/Add";

export default function () {
    return <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/patients" component={PatientList}/>
        <Route exact path="/patients/add" component={PatientAdd}/>
        <Redirect to="/" />
    </Switch>
}