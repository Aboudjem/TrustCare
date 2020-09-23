import {CircularProgress} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    center: {
        display: 'flex',
        flexGrow: '1',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default function () {
    const classes = useStyles();

    return <div className={classes.center}>
        <CircularProgress/>
    </div>
}