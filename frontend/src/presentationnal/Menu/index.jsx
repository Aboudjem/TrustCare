import React from "react";
import {
    AppBar,
    Drawer,
    List,
    Toolbar,
    Typography
} from "@material-ui/core";
import {
    Business,
    LocalHospital,
    Person
} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import ListItemLink from "./ListItemLink";
import Account from "../../container/Account";
import {useSelector} from "react-redux";
import Home from '../Home';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'stretch',
        minHeight: '100vh',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        flexGrow: 1
    }
}));

export default function ({children}) {
    const classes = useStyles();

    const {connected, roles} = useSelector(state => state.account)

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap className={classes.title}>
                        TrustCare
                    </Typography>
                    <Account/>
                </Toolbar>
            </AppBar>
            {connected && <Drawer
                variant="permanent"
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <List>
                        {roles.includes('admin') && <>
                        <ListItemLink to="/admin/patients" primary="Patients" icon={<Person/>}/>
                        <ListItemLink to="/admin/doctors" primary="Doctors" icon={<LocalHospital/>}/>
                        <ListItemLink to="/admin/insurances" primary="Insurances" icon={<Business/>}/>
                        </>}
                    </List>
                </div>
            </Drawer> }
            <main className={classes.content}>
                <Toolbar/>
                {connected ? children : <Home/>}
            </main>
        </div>
    )
        ;
}