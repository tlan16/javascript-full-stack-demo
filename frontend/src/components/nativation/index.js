import React from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";

function Navigation(props) {
    return <ResponsiveDrawer
        history={props.history}
        routes={props.routes}
    />
}

export default Navigation
