import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = useState(true)

    return (
            <Route {...rest} component={props => (
                isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
            )} />
    )
}

export default PrivateRoute;