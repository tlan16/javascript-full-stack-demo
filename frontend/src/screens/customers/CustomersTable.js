import React from "react";
import URI from 'urijs'
import MaterialTable from "material-table";

function NewTable () {
    return (
        <MaterialTable
            title="Customers"
            columns={[
                { title: 'First Name', field: 'firstName' },
                { title: 'Last Name', field: 'lastName' },
                { title: 'Email', field: 'email' },
            ]}
            data={query => fetchCustomers(query)}
            options={{
                pageSize: 10,
            }}
        />
    )
}

async function fetchCustomers(query) {
    const url = (new URI('customers'))
        .absoluteTo(process.env.REACT_APP_API_HOST)
        .query({
            page: query.page + 1,
            size: query.pageSize,
            search: query.search,
        })
        .toString();

    const response = await fetch(url);
    const customers = await response.json();

    return {
        ...customers,
        page: customers.page -1,
    }
}

export default NewTable
