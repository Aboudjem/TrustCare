import Account from "../presentationnal/Account";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {connectAccount} from "../redux/account/actions";

export default function () {
    const {error, connected, address, loading} = useSelector(state => state.account)

    const dispatch = useDispatch();

    const connect = () => {
        dispatch(connectAccount());
    };

    return <Account error={error} connected={connected} account={address} connect={connect} loading={loading}/>
}