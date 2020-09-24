import {Redirect, Route, Switch} from "react-router";
import React from "react";
import Home from "./presentationnal/Home";
import PatientList from "./container/Patients/List";
import PatientAdd from "./container/Patients/Add";
import DoctorList from "./container/Doctors/List";
import DoctorAdd from "./container/Doctors/Add";
import InsuranceList from "./container/Insurances/List";
import InsuranceAdd from "./container/Insurances/Add";
import {useSelector} from "react-redux";


export default function () {
    const {roles} = useSelector(state => state.account)

    return <Switch>
        <Route exact path="/" component={Home}/>
        {
            roles.includes('admin') && (<>
                <Route exact path="/admin/patients" component={PatientList}/>
                <Route exact path="/admin/patients/add" component={PatientAdd}/>
                <Route exact path="/admin/doctors" component={DoctorList}/>
                <Route exact path="/admin/doctors/add" component={DoctorAdd}/>
                <Route exact path="/admin/insurances" component={InsuranceList}/>
                <Route exact path="/admin/insurances/add" component={InsuranceAdd}/>
            </>)
        }
        {roles.includes('doctor') && (<>
            <Route exact path="/consultation/add" component={PatientList}/>
            </>)
        }
        <Redirect to="/"/>

    </Switch>
}