import AddInsurance from "../../presentationnal/Insurances/Add";
import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {newInsuranceChangeField, newInsuranceSubmit} from "../../redux/insurance/add/actions";
import {useHistory} from "react-router";

export default function () {
    const dispatch = useDispatch();
    const history = useHistory();
    const {fields, loading, error} = useSelector(state => state.insurances.add)

    const fieldChanged = useCallback((field, value) => {
        dispatch(newInsuranceChangeField(field, value));
    }, [dispatch])

    const submit = useCallback(() => {
        dispatch(newInsuranceSubmit(history))
    }, [dispatch, history])

    return <AddInsurance fieldChanged={fieldChanged} fields={fields} submit={submit} loading={loading} error={error}/>;
}