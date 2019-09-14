import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import loadable from '@loadable/component';
import Loading from "../../components/Loading";

const Paper = loadable(
    () => import('@material-ui/core/Paper'),
    {
        fallback: <Loading/>,
    },
);

const CustomersTable = loadable(
    () => import('./CustomersTable'),
    {
        fallback: <Loading/>,
    },
);

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
