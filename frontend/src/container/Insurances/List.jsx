import React, {useCallback, useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import InsuranceList from '../../presentationnal/Insurances/List'
import {loadInsurances} from "../../redux/insurance/list/actions";

export default function () {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(loadInsurances())
    }, [dispatch]);

    const {loading, error, insurances} = useSelector(state => state.insurances.list)

    const refresh = useCallback(() => {
        dispatch(loadInsurances())
    }, [dispatch])

    return <InsuranceList
        loading={loading}
        error={error}
        insurances={insurances}
        refresh={refresh}
    />;
}