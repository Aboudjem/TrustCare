import React from 'react';
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Add, Refresh} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Loading from "../Loading";


export default function ({loading, error, insurances, refresh,}) {

    const Header = () => {
        return (<div>
            <IconButton onClick={refresh}>
                <Refresh/>
            </IconButton>
            <IconButton component={Link} to="/admin/insurances/add">
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
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {insurances.map(insurance => (<TableRow key={insurance._id}>
                        <TableCell>{insurance.name}</TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    </>);
}