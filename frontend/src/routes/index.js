import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import URI from 'urijs'
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
        path: '/customers',
        exact: false,
        component: Customers,
    },
];

/**
 * @param {string} path
 * @returns {string}
 */
function pathToRouteName(path) {
    // eslint-disable-next-line no-unused-vars
    for (const route of routes) {
        if (URI(route.path).equals(path)) {
            return route.name
        }
    }
}

function AppRouter() {
    return (
        <Router>
            <Route
                render={(props) => <Navigation {...props} routes={routes} />}
            />
        </Router>
    )
}

export {
    pathToRouteName,
}
export default AppRouter
