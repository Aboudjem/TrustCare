import {Button, CircularProgress, Tooltip} from "@material-ui/core";
import {Person, Warning} from "@material-ui/icons";
import React from "react";

export default function ({error, connected, connect, loading, account}) {

    if(!connected) {
        return <Button onClick={connect} disabled={loading}>
            {error && <Tooltip title={error}>
                <Warning/>
            </Tooltip>}
            {loading && <CircularProgress color="contrast" size={15}/>}
            Sign in
        </Button>
    }
    return <Button>
        <Person/>
        {account.substr(0,12)}
        ...
    </Button>;
}