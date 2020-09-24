import AddDoctor from "../../presentationnal/Doctors/Add";
import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {newDoctorChangeField, newDoctorSubmit} from "../../redux/doctors/add/actions";
import {useHistory} from "react-router";

export default function () {
    const dispatch = useDispatch();
    const history = useHistory();
    const {fields, loading, error} = useSelector(state => state.doctors.add)

    const fieldChanged = useCallback((field, value) => {
        dispatch(newDoctorChangeField(field, value));
    }, [dispatch])

    const submit = useCallback(() => {
        dispatch(newDoctorSubmit(history))
    }, [dispatch, history])

    return <AddDoctor fieldChanged={fieldChanged} fields={fields} submit={submit} loading={loading} error={error}/>;
}