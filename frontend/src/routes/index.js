import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Index from "../screens/index";
import Customers from "../screens/customers";
import Navigation from "../components/nativation";

const routes = [
    {
        name: 'Home',
        path: '/',
        exact: true,
        component: Index,
    },
    {
        name: 'Customers',
        path: '/customers/',
        exact: false,
        component: Customers,
    },
];

function AppRouter() {
    return (
        <Router>
            <Route
                render={(props) => <Navigation {...props} routes={routes} />}
            />
        </Router>
    )
}

export default AppRouter
