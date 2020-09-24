import React from 'react';
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Add, Refresh} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Loading from "../Loading";


export default function ({loading, error, patients, refresh,}) {

    const Header = () => {
        return (<div>
            <IconButton onClick={refresh}>
                <Refresh/>
            </IconButton>
            <IconButton component={Link} to="/admin/patients/add">
                <Add/>
            </IconButton>
        </div>);
    }

    if (loading)
        return <>
            <Header/>
            <Loading/>
        </>;

    if (error)
        return <>
            <Header/>
            {error}
        </>;

    return (<>
        <Header/>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>CNS number</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Birth date</TableCell>
                        <TableCell>Gender</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map(patient => (<TableRow key={patient._id}>
                        <TableCell>{patient.cns_number}</TableCell>
                        <TableCell>{patient.first_name} {patient.last_name}</TableCell>
                        <TableCell>{patient.birth_date.slice(0, -14)}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    </>);
}