import {Button, Paper, TextField, Typography} from "@material-ui/core";
import React, {useCallback} from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    title: {
        margin: '15px 5px'
    },
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        display: 'flex',
    },
    submitRow: {
        display: 'flex',
        justifyContent: 'right'
    },
    field: {
        margin: '10px 20px',
        flexGrow: '1',
        width: '50px'
    },
    button: {
        margin: '10px 20px',
    },
}));

export default function ({ fieldChanged, submit, fields, error, loading }) {
    const classes = useStyles();

    const onChange = useCallback((e) => {
        fieldChanged(e.target.name, e.target.value)
    }, [fieldChanged])

    return <>
        <Typography variant="h4" className={classes.title}>
            Add insurance
        </Typography>
        {error && <Typography color="error">
            {error}
        </Typography>}
        <Paper>
            <form className={classes.root} noValidate autoComplete="off">
                <div className={classes.row}>
                    <TextField className={classes.field} label="Name" name="name" variant="outlined" onChange={onChange} value={fields.name} disabled={loading} color="secondary"/>
                </div>
                <div className={classes.submitRow}>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={submit}>Submit</Button>
                </div>
            </form>
        </Paper>
    </>;
}