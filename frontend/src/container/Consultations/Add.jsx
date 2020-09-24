import AddConsultation from "../../presentationnal/Consultations/Add";
import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {newConsultationChangeField, newConsultationSubmut} from "../../redux/consultations/add/actions";

export default function () {
    const dispatch = useDispatch();
    const history = useHistory();
    const {fields, loading, error} = useSelector(state => state.consultations.add)

    const fieldChanged = useCallback((field, value) => {
        dispatch(newConsultationChangeField(field, value));
    }, [dispatch])

    const submit = useCallback(() => {
        dispatch(newConsultationSubmut(history))
    }, [dispatch, history])

    return <AddConsultation fieldChanged={fieldChanged} fields={fields} submit={submit} loading={loading} error={error}/>;
}