import React, {useCallback, useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import DoctorList from '../../presentationnal/Doctors/List'
import {loadDoctors} from "../../redux/doctors/list/actions";

export default function () {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(loadDoctors())
    }, [dispatch]);

    const {loading, error, doctors} = useSelector(state => state.doctors.list)

    const refresh = useCallback(() => {
        dispatch(loadDoctors())
    }, [dispatch])

    return <DoctorList
        loading={loading}
        error={error}
        doctors={doctors}
        refresh={refresh}
    />;
}