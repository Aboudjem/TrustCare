import React from 'react';
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Add, Refresh} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Loading from "../Loading";


export default function ({loading, error, doctors, refresh,}) {

    const Header = () => {
        return (<div>
            <IconButton onClick={refresh}>
                <Refresh/>
            </IconButton>
            <IconButton component={Link} to="/doctors/add">
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
                        <TableCell>Licence</TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {doctors.map(doctor => (<TableRow key={doctor._id}>
                        <TableCell>{doctor.licence}</TableCell>
                        <TableCell>{doctor.first_name} {doctor.last_name}</TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    </>);
}