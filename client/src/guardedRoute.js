import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
  return(
    <Route {...rest} render={(props) => (
      auth === true
        ? <Component {...props} />
        : <Redirect to='/users/login' />
    )} />
  )
}

export default GuardedRoute;

