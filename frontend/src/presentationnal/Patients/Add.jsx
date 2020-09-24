import {Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography} from "@material-ui/core";
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
            Add patient
        </Typography>
        {error && <Typography color="error">
            {error}
        </Typography>}
        <Paper>
            <form className={classes.root} noValidate autoComplete="off">
                <div className={classes.row}>
                    <TextField className={classes.field} label="Social Security Number" name="cns_number" variant="outlined" onChange={onChange} value={fields.cns_number} disabled={loading} color="secondary"/>
                </div>
                <div className={classes.row}>
                    <TextField className={classes.field} label="First name" name="first_name" variant="outlined" onChange={onChange} value={fields.first_name} disabled={loading} color="secondary"/>
                    <TextField className={classes.field} label="Last name" name="last_name" variant="outlined" onChange={onChange} value={fields.last_name} disabled={loading} color="secondary"/>
                </div>
                <div className={classes.row}>
                    <TextField className={classes.field} label="Date of birth" name="birth_date" variant="outlined" onChange={onChange} value={fields.birth_date} disabled={loading} color="secondary"/>
                    <FormControl className={classes.field} variant="outlined">
                        <InputLabel>Gender</InputLabel>
                        <Select label="Gender" name="gender" onChange={onChange} value={fields.gender} disabled={loading} color="secondary">
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.submitRow}>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={submit}>Submit</Button>
                </div>
            </form>
        </Paper>
    </>;
}