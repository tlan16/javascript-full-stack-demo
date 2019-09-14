import React, {useEffect, useState} from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import {makeStyles} from "@material-ui/core";
import { resolve } from "uri-js";

const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
    },
}));

async function fetchCustomers() {
    const url = resolve(process.env.REACT_APP_API_HOST, 'customers');
    const response = await fetch(url);
    return response.json();
}

function CustomersTable() {
    const classes = useStyles();

    const [customers, setCustomers]  = useState({data: []});

    useEffect(() => {
        fetchCustomers()
            .then(customers => setCustomers(customers))
    }, []);

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {customers.data.map(
                    row => (
                        <TableRow key={row.email}>
                            <TableCell component="th" scope="row"> {row.firstName}</TableCell>
                            <TableCell align="right">{row.lastName}</TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    )
}

export default CustomersTable
