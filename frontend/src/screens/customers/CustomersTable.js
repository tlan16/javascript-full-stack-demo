import React, {useEffect, useState} from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import {makeStyles} from "@material-ui/core";
import URI from 'urijs'
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
    },
}));

async function fetchCustomers(page, size) {
    const url = (new URI('customers'))
        .absoluteTo(process.env.REACT_APP_API_HOST)
        .query({page, size})
        .toString();

    const response = await fetch(url);
    return response.json();
}

function CustomersTable() {
    const classes = useStyles();

    const [customers, setCustomers]  = useState({
        data: [],
        "page": 0,
        "size": 0,
        "totalCount": 0,
        "totalPages": 0.
    });
    const [pageSize, setPageSize] = React.useState(5);
    const [pageNumber, setPageNumber] = React.useState(0);

    useEffect(() => {
        fetchCustomers(pageNumber + 1, pageSize)
            .then(customers => setCustomers(customers))
    }, [pageNumber, pageSize]);

    function handleChangePage(event, newPage) {
        setPageNumber(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setPageSize(+event.target.value);
        setPageNumber(0);
    }

    return (
        <React.Fragment>
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
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={customers.totalCount}
                rowsPerPage={pageSize}
                page={pageNumber}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </React.Fragment>
    )
}

export default CustomersTable
