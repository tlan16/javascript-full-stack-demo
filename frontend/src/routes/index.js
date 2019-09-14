import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Index from "../screens/index";
import Customers from "../screens/customers";
import Navigation from "../components/nativation";

function AppRouter() {
    return (
        <Router>
            <Navigation/>
            <Route path="/" exact component={Index}/>
            <Route path="/customers/" component={Customers}/>
        </Router>
    )
}

export default AppRouter
