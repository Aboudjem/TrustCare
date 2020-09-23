import React from "react";
import {
    AppBar,
    Divider,
    Drawer,
    List,
    Toolbar,
    Typography
} from "@material-ui/core";
import {
    Person
} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import ListItemLink from "./ListItemLink";

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
}));

export default function ({children}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        TrustCare
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItemLink to="/patients" primary="Patients" icon={<Person/>}/>
                    </List>
                    <Divider/>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                {children}
            </main>
        </div>
    )
        ;
}