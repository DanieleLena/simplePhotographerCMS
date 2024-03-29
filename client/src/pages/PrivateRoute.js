import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({children, ...rest}) => {
  // this ...rest grab all the parameters in App.js,  on the PrivateRoute component

  // eslint-disable-next-line
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to="/login"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
