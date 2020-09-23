import React, {useCallback, useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadPatients} from "../../redux/patients/actions";
import PatientList from '../../presentationnal/Patients/List'

export default function () {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(loadPatients())
    }, [dispatch]);

    const {loading, error, patients} = useSelector(state => state.patients)

    const refresh = useCallback(() => {
        dispatch(loadPatients())
    }, [dispatch])

    return <PatientList
        loading={loading}
        error={error}
        patients={patients}
        refresh={refresh}
    />;
}