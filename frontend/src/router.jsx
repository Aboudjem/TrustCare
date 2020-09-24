import {Redirect, Route, Switch} from "react-router";
import React from "react";
import Home from "./presentationnal/Home";
import PatientList from "./container/Patients/List";
import PatientAdd from "./container/Patients/Add";
import DoctorList from "./container/Doctors/List";
import DoctorAdd from "./container/Doctors/Add";


export default function () {
    return <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/patients" component={PatientList}/>
        <Route exact path="/patients/add" component={PatientAdd}/>
        <Route exact path="/doctors" component={DoctorList}/>
        <Route exact path="/doctors/add" component={DoctorAdd}/>
        <Redirect to="/" />
    </Switch>
}