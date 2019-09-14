import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React from "react";
import CustomersTable from "./CustomersTable";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
}));


function Customers() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <CustomersTable/>
        </Paper>
    );
}

export default Customers;
