import React from "react";
import loadable from '@loadable/component';
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faHome } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

const BottomNavigation = loadable(
    () => import('@material-ui/core/BottomNavigation'),
    {
        fallback: <Loading/>,
    },
);

const BottomNavigationAction = loadable(
    () => import('@material-ui/core/BottomNavigationAction'),
    {
        fallback: <Loading/>,
    },
);

function Navigation() {
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
        >
            <BottomNavigationAction
                component={Link}
                label="Home"
                icon={<FontAwesomeIcon icon={faHome} />}
                to="/"
            />
            <BottomNavigationAction
                component={Link}
                label="Customers"
                icon={<FontAwesomeIcon icon={faUsers} />}
                to="/customers"
            />
        </BottomNavigation>
    );
}

export default Navigation
