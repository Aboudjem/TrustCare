import AddPatient from "../../presentationnal/Patients/Add";
import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {newPatientChangeField, newPatientSubmit} from "../../redux/patients/add/actions";
import {useHistory} from "react-router";

export default function () {
    const dispatch = useDispatch();
    const history = useHistory();
    const {fields, loading, error} = useSelector(state => state.patients.add)

    const fieldChanged = useCallback((field, value) => {
        dispatch(newPatientChangeField(field, value));
    }, [dispatch])

    const submit = useCallback(() => {
        dispatch(newPatientSubmit(history))
    }, [dispatch, history])

    return <AddPatient fieldChanged={fieldChanged} fields={fields} submit={submit} loading={loading} error={error}/>;
}