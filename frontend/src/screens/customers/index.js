import React from "react";
import loadable from '@loadable/component';
import Loading from "../../components/Loading";

const CustomersTable = loadable(
    () => import('./CustomersTable'),
    {
        fallback: <Loading/>,
    },
);

function Customers() {
    return  <CustomersTable/>;
}

export default Customers;
