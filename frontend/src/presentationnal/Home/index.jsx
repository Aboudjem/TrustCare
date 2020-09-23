import React from "react";
import logo from './logo.png'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }
})

export default function () {
    const classes = useStyles();

    return (<div className={classes.center}>
        <img src={logo} alt="Logo"/>
    </div>);
}